const COMMENTS_PER_PAGE = 5;

const renderComments = (commentsData, container) => {
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

    comment.append(avatar, commentText);
    container.append(comment);
  });
};

const initCommentsPagination = (comments, container) => {
  renderComments(comments.slice(0, COMMENTS_PER_PAGE), container);
  return COMMENTS_PER_PAGE;
};

const loadMoreComments = (comments, container, currentIndex) => {
  const nextChunk = comments.slice(currentIndex, currentIndex + COMMENTS_PER_PAGE);
  renderComments(nextChunk, container);
  return currentIndex + COMMENTS_PER_PAGE;
};

export { COMMENTS_PER_PAGE, loadMoreComments, initCommentsPagination };
