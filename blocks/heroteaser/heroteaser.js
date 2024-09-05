export function createKeyLine(heading) {
  const u = heading.querySelector('u') || document.createElement('u');
  heading.classList.add('keyline');
  u.textContent = heading.textContent;
  heading.replaceChildren(u);
}

export function mergeSiblingButtons(container) {
  const mergeTarget = container.querySelector('.button-wrapper + .button-wrapper');
  while (container.querySelector('.button-wrapper + .button-wrapper')) {
    const previous = mergeTarget.previousElementSibling;
    previous.append(...mergeTarget.children);
    mergeTarget.remove();
  }
}

export function createSectionArc(section) {
  section.classList.add('arc-container');
  const arcWrapper = document.createElement('div');
  arcWrapper.className = 'arc-wrapper';

  const arc = document.createElement('div');
  arc.className = 'arc';
  arcWrapper.append(arc);

  const arcIcon = document.createElement('span');
  arcIcon.className = 'icon icon-section-arc';
  arc.append(arcIcon);

  decorateIcons(arc);
  useSvgForIcon(arcIcon);

  section.append(arcWrapper);
}


function buildHeroTeaser(heading, imgOrVideo, supportingContentEls, buttons, additionalContentEls) {
  createKeyLine(heading);

  const finalElements = [heading];

  if (imgOrVideo) {
    const teaserMedia = document.createElement('div');
    teaserMedia.className = 'heroteaser-media-container';
    teaserMedia.append(imgOrVideo);
    if (teaserMedia.querySelector('.video')) {
      teaserMedia.classList.add('heroteaser-video-container');
      teaserMedia.querySelector('.video').classList.add('light');
    }
    finalElements.push(teaserMedia);
  }

  const supportingContentContainer = document.createElement('div');
  supportingContentContainer.className = 'supporting-content-container';
  supportingContentContainer.append(...supportingContentEls);
  finalElements.push(supportingContentContainer);

  finalElements.push(...buttons);

  const additionalContentContainer = document.createElement('div');
  additionalContentContainer.className = 'additional-content-container';
  additionalContentContainer.append(...additionalContentEls);
  finalElements.push(additionalContentContainer);

  return finalElements;
}

/**
 * decorate the heroteaser block
 * @param {Element} block the block element
 */
export default async function decorate(block) {
  const section = block.closest('.section');
  createSectionArc(section);

  const heading = block.querySelector('h1');
  if (!heading) return;

  const mainContainer = heading.parentElement;
  const imgOrVideo = mainContainer.querySelector('.img-wrapper, .video');
  if (!imgOrVideo) {
    block.classList.add('no-media');
    section.classList.add('full-cover');
  }

  const ps = mainContainer.querySelectorAll(':scope > p:not([class])');
  mergeSiblingButtons(mainContainer);

  const buttons = mainContainer.querySelectorAll('.button-wrapper');
  const additionalContentEls = [...block.querySelectorAll(':scope > div > div > *')].filter((el) => {
    const container = el.parentElement;
    return container !== mainContainer;
  });

  block.replaceChildren(...buildHeroTeaser(heading, imgOrVideo, ps, buttons, additionalContentEls));
}
