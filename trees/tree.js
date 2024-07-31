class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  // Insert a node in the tree
  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /**
   * Inserting like a binary search tree here but you can insert in other ways
   * depending on the requirements.
   *
   * In binary search tree, the left child is less than the parent node and
   * the right child is greater than the parent node.
   * */
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Search for a node with a specific value
  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (node === null) {
      return null;
    }
    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return node;
    }
  }

  /**
   * In-order traversal - This traversal visits all the nodes in ascending order.
   */
  inOrderTraversal(node = this.root, result = []) {
    if (node !== null) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  /**
   * Pre-order traversal - In this traversal, the root node is visited first,
   * then the left subtree and finally the right subtree.
   */
  preOrderTraversal(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preOrderTraversal(node.left, result);
      this.preOrderTraversal(node.right, result);
    }
    return result;
  }

  /**
   * Post-order traversal - In this traversal, the root node is visited last,
   * after the left subtree and the right subtree.
   */
  postOrderTraversal(node = this.root, result = []) {
    if (node !== null) {
      this.postOrderTraversal(node.left, result);
      this.postOrderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Find the minimum node
  findMinNode(node = this.root) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Find the maximum node
  findMaxNode(node = this.root) {
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }

  // Remove a node
  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.value) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.value) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // Node with only one child or no child
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with two children: Get the inorder successor
      let temp = this.findMinNode(node.right);
      node.value = temp.value;

      node.right = this.removeNode(node.right, temp.value);
      return node;
    }
  }
}

// Example usage:
const tree = new Tree();
tree.insert(15);
tree.insert(25);
tree.insert(10);
tree.insert(7);
tree.insert(22);
tree.insert(17);
tree.insert(13);
tree.insert(5);
tree.insert(9);
tree.insert(27);

console.log("In-order Traversal:", tree.inOrderTraversal());
console.log("Pre-order Traversal:", tree.preOrderTraversal());
console.log("Post-order Traversal:", tree.postOrderTraversal());

console.log("Search for 22:", tree.search(22));
console.log("Search for 100:", tree.search(100));

tree.remove(22);
console.log("After removing 22, In-order Traversal:", tree.inOrderTraversal());
