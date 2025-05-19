console.log("Script is running");

const galleryImages = document.querySelectorAll(".gallery img");

const overlay = document.createElement("div");
overlay.id = "image-overlay";
overlay.style.display = "none";
overlay.innerHTML = `
  <div class="overlay-content">
    <span id="close-btn">&times;</span>
    <img id="overlay-img" src="" alt="Enlarged Image">
  </div>
`;
document.body.appendChild(overlay);

// Add click event to each image
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    const overlayImg = document.getElementById("overlay-img");
    overlayImg.src = img.src;
    overlay.style.display = "flex";
  });
});

// Close button handler
document.getElementById("close-btn").addEventListener("click", () => {
  overlay.style.display = "none";
});

// Comment section

document.addEventListener("DOMContentLoaded", () => {
  const commentInput = document.querySelector(".comment-input");
  const submitBtn = document.querySelector(".comment-submitBtn");
  const savedCommentsDiv = document.querySelector(".saved-comments");

  // Load saved comments from localStorage
  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    renderComments(comments);
  };

  const renderComments = (comments) => {
    const oldComments = document.querySelectorAll(".comment");
    oldComments.forEach((comment) => comment.remove());

    comments.forEach((commentText, index) => {
      const commentEl = document.createElement("div");
      commentEl.className = "comment";

      commentEl.innerHTML = `
        <div class="comment-left">
          <div class="user-icon">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <div class="comment-info">
            <div class="username">
              <p><b>Anonymous</b></p>
            </div>
            <p class="comment-text">${commentText}</p>
          </div>
        </div>
        <div class="comment-right">
          <i class="fa fa-pencil edit-comment" data-index="${index}" aria-hidden="true" title="Edit"></i>
          <i class="fa fa-trash delete-comment" data-index="${index}" aria-hidden="true" title="Delete"></i>
        </div>
      `;

      savedCommentsDiv.appendChild(commentEl);
    });

    document.querySelectorAll(".delete-comment").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteComment(index);
      });
    });

    document.querySelectorAll(".edit-comment").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        editComment(index, e.target);
      });
    });
  };

  // Save Comment
  const addComment = () => {
    const comment = commentInput.value.trim();
    if (comment === "") return;

    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));

    commentInput.value = "";
    loadComments();
  };

  // Delete a comment
  const deleteComment = (index) => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  };

  // Edit a comment
  const editComment = (index, editBtn) => {
    const commentInfo = editBtn
      .closest(".comment")
      .querySelector(".comment-info");
    const commentTextEl = commentInfo.querySelector(".comment-text");

    const originalText = commentTextEl.textContent;

    const textarea = document.createElement("textarea");
    textarea.value = originalText;
    textarea.style.width = "100%";
    textarea.style.fontSize = "16px";
    textarea.style.border = "1px solid rgb(255, 56, 93)";
    textarea.style.borderRadius = "5px";
    commentInfo.replaceChild(textarea, commentTextEl);

    editBtn.classList.remove("fa-pencil");
    editBtn.classList.add("fa-save");
    editBtn.title = "Save";

    editBtn.removeEventListener("click", () => {});
    editBtn.addEventListener("click", () =>
      saveEditedComment(index, textarea.value.trim())
    );
  };

  const saveEditedComment = (index, newText) => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    if (newText === "") return; // prevent saving empty text
    comments[index] = newText;
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  };

  submitBtn.addEventListener("click", addComment);

  loadComments();
});
