const queue = [];

const processQueue = async () => {
  while (queue.length > 0) {
    const task = queue.shift();
    await task();
  }
};

const addToQueue = (task) => {
  queue.push(task);
  processQueue();
};

module.exports = { addToQueue };
