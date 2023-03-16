export default (json) => {
  let topPost = "";

  for (const post of json.data.children) {
    const title = post.data.title;
    const tag = title.slice(0, 4);
    if (tag === "[WP]") {
      topPost = title.slice(4);
      break;
    }
  }

  return topPost;
};
