export const COMMENTS_PER_PAGE = 5;
export const renderComments = (commentsData, container) => {
  commentsData.forEach((commentData) => {
    const comment = document.createElement('li');
    const avatar = document.createElement('img');
    const commentText = document.createElement('p');

    comment.classList.add('social__comment');
    avatar.classList.add('social__picture');
    avatar.alt = commentData.name;
    avatar.src = commentData.avatar;
    avatar.width = 35;
    avatar.height = 35;
    commentText.classList.add('social__text');
    commentText.textContent = commentData.message;

    comment.append(avatar);
    comment.append(commentText);

    container.append(comment);
  });
};

export const paginateComments = (comments, container) => {
  const firstComments = comments.slice(0, COMMENTS_PER_PAGE);
  let currentIndex = COMMENTS_PER_PAGE;
  renderComments(firstComments, container);
  const loadMoreComments = () => {
    const nextCommentsChunk = comments.slice(currentIndex, currentIndex + COMMENTS_PER_PAGE);
    renderComments(nextCommentsChunk, container);
    currentIndex += COMMENTS_PER_PAGE;
  };
  return {
    loadMore: loadMoreComments,
    getShownCount: () => container.children.length
  };
};
