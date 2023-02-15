const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.apps');

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetY = y - box.top - box.height / 2;
      const offsetX = x - box.right - box.width / 2;
      if (offsetY < 0 && offsetY > closest.offsetY && offsetX < 0 && closest.offsetX) {
        return { offsetX, offsetY, element: child };
      } else {
        return closest;
      }
    },
    { offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.NEGATIVE_INFINITY }
  ).element;
}
