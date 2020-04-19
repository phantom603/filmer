export function focusNextItem(currentNode) {
    if (currentNode.nextElementSibling !== null) {
        currentNode.nextElementSibling.focus();
    }
}

export function focusPrevItem(currentNode) {
    if (currentNode.previousElementSibling !== null) {
        currentNode.previousElementSibling.focus();
    }
}

export function focusAboveItem(currentNode, step) {
    let node = currentNode;
    for (let i = 0; i < step; i++) {
        node = node.previousElementSibling;
        if (node === null) {
            return;
        }
    }
    if (node !== null) {
        node.focus();
    }
}

export function focusBelowItem(currentNode, step) {
    let node = currentNode;
    for (let i = 0; i < step; i++) {
        if (node.nextElementSibling !== null) {
            node = node.nextElementSibling;
        }
    }
    if (node !== null) {
        node.focus();
    }
}