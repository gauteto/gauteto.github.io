async function loadPapers(dataPath) {
  const response = await fetch(dataPath);
  if (!response.ok) throw new Error('Could not load papers data.');
  const data = await response.json();
  if (!Array.isArray(data)) return [];
  return data.sort((a, b) => (b.year || 0) - (a.year || 0));
}

function buildPaperCard(paper) {
  const article = document.createElement('article');
  article.className = 'paper';

  const title = document.createElement('h3');
  title.textContent = paper.title || 'Untitled';
  if (paper.status) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = paper.status;
    title.appendChild(tag);
  }
  article.appendChild(title);

  const meta = document.createElement('div');
  meta.className = 'meta';
  const bits = [paper.authors, paper.journal, paper.year].filter(Boolean);
  meta.textContent = bits.join(' | ');
  article.appendChild(meta);

  if (paper.abstract) {
    const abstract = document.createElement('p');
    abstract.textContent = paper.abstract;
    article.appendChild(abstract);
  }

  const links = document.createElement('p');
  if (paper.pdf) {
    const pdf = document.createElement('a');
    pdf.className = 'button';
    pdf.href = paper.pdf;
    pdf.textContent = 'PDF';
    pdf.target = '_blank';
    pdf.rel = 'noopener';
    links.appendChild(pdf);
  }
  if (paper.doi) {
    const doi = document.createElement('a');
    doi.className = 'button';
    doi.href = `https://doi.org/${paper.doi}`;
    doi.textContent = 'DOI';
    doi.target = '_blank';
    doi.rel = 'noopener';
    links.appendChild(doi);
  }
  if (paper.code_link) {
    const code = document.createElement('a');
    code.className = 'button';
    code.href = paper.code_link;
    code.textContent = 'Code';
    code.target = '_blank';
    code.rel = 'noopener';
    links.appendChild(code);
  }
  if (paper.scholar_link) {
    const scholar = document.createElement('a');
    scholar.className = 'button';
    scholar.href = paper.scholar_link;
    scholar.textContent = 'Scholar';
    scholar.target = '_blank';
    scholar.rel = 'noopener';
    links.appendChild(scholar);
  }
  if (links.childNodes.length > 0) {
    article.appendChild(links);
  }

  return article;
}

async function renderPapers(config) {
  const { containerId, type, dataPath } = config;
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const papers = await loadPapers(dataPath);
    const filtered = papers.filter((p) => p.type === type);

    if (filtered.length === 0) {
      container.innerHTML = '<p>No entries yet.</p>';
      return;
    }

    filtered.forEach((paper) => {
      container.appendChild(buildPaperCard(paper));
    });
  } catch (error) {
    container.innerHTML = '<p>Could not load papers right now.</p>';
    console.error(error);
  }
}

window.renderPapers = renderPapers;
