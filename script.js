// Get container and all items
const itemsContainer = document.querySelector('.items');
const items = document.querySelectorAll('.item');

// Variables to track dragging state
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Initialize item positions in a grid
function initializeItems() {
    const itemWidth = 80;
    const itemHeight = 80;
    const containerWidth = itemsContainer.offsetWidth;
    const containerHeight = itemsContainer.offsetHeight;
    const gap = 20;
    
    // Calculate grid dimensions
    const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
    
    items.forEach((item, index) => {
        const row = Math.floor(index / itemsPerRow);
        const col = index % itemsPerRow;
        
        const x = col * (itemWidth + gap) + gap;
        const y = row * (itemHeight + gap) + gap;
        
        item.style.left = x + 'px';
        item.style.top = y + 'px';
    });
}

// Handle mouse down on item
function handleMouseDown(e) {
    if (e.button !== 0) return; // Only left mouse button
    
    selectedItem = this;
    selectedItem.classList.add('dragging');
    
    // Get the position of the item and mouse
    const rect = selectedItem.getBoundingClientRect();
    const containerRect = itemsContainer.getBoundingClientRect();
    
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// Handle mouse move
function handleMouseMove(e) {
    if (!selectedItem) return;
    
    const containerRect = itemsContainer.getBoundingClientRect();
    
    // Calculate new position
    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;
    
    // Get item dimensions
    const itemWidth = selectedItem.offsetWidth;
    const itemHeight = selectedItem.offsetHeight;
    
    // Apply boundary constraints
    newX = Math.max(0, Math.min(newX, containerRect.width - itemWidth));
    newY = Math.max(0, Math.min(newY, containerRect.height - itemHeight));
    
    // Update item position
    selectedItem.style.left = newX + 'px';
    selectedItem.style.top = newY + 'px';
}

// Handle mouse up
function handleMouseUp(e) {
    if (selectedItem) {
        selectedItem.classList.remove('dragging');
        selectedItem = null;
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// Attach event listeners to each item
items.forEach(item => {
    item.addEventListener('mousedown', handleMouseDown);
});

// Initialize item positions when page loads
window.addEventListener('load', initializeItems);

// Re-initialize on window resize
window.addEventListener('resize', initializeItems);

