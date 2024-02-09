import model from './model';
import pages from './pages';
import profilePage from './profilePage';
import commentsTemplate from './commentsTemplates.html.hbs';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    const photoStats = await model.photoStats(id);
    this.setFriendsAndPhotos(friend, id, url, photoStats);
  },

  setFriendsAndPhotos(friend, id, url, stats) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');
    const footerPhotoComp = document.querySelector('.component-footer-photo');

    this.friend = friend;
    this.photoId = id;

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url('${url}')`;
    footerPhotoComp.style.backgroundImage = `url('${model.me.photo_50}')`;

    this.setLikes(stats.likes, stats.liked);
    document.addEventListener('click', () => {
      this.style.background = 'red';
    });
    this.setComments(stats.comments);
  },

  handleEvents() {
    let startForm;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startForm = { y: e.changedTouches[0].pageY };
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e) => {
      const direction = e.changedTouches[0].pageY - startForm.y;

      if (direction < 0) {
        await this.getNextPhoto();
      }
    });
    document
      .querySelector('.component-header-profile-link')
      .addEventListener('click', async () => {
        await profilePage.setUser(this.friend);
        pages.openPage('profile');
        profilePage.handleEvents();
      });

    document
      .querySelector('.component-footer-container-profile-link')
      .addEventListener('click', async () => {
        await profilePage.setUser(model.me);
        pages.openPage('profile');
      });
    document
      .querySelector('.component-footer-container-social-comments')
      .addEventListener('click', async () => {
        document.querySelector('.component-comments').classList.remove('hidden');
        await this.loadComments(this.photoId);
      });

    const input = document.querySelector('.component-comments-container-form-input');

    document.querySelector('.component-comments').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        document.querySelector('.component-comments').classList.add('hidden');
      }
    });
    document
      .querySelector('.component-comments-container-form-send')
      .addEventListener('click', async () => {
        if (input.value.trim().length) {
          await model.postComment(this.photoId, input.value.trim());
          input.value = '';
          await this.loadComments(this.photoId);
        }
      });
  },
  async loadComments(photo) {
    const comments = await model.getComments(photo);
    const commentsElements = commentsTemplate({
      list: comments.map((comment) => {
        return {
          name: `${comment.user.first_name ?? ''} ${comment.user.last_name ?? ''}`,
          photo: comment.user.photo_50,
          text: comment.text,
        };
      }),
    });
    document.querySelector('.component-comments-container-list').innerHTML = '';
    document.querySelector('.component-comments-container-list').append(commentsElements);
    this.setComments(comments.length);
  },

  setLikes(total, liked) {
    const LikesElement = document.querySelector(
      '.component-footer-container-social-likes'
    );
    LikesElement.innerText = total;

    if (liked) {
      LikesElement.classList.add('liked');
    } else {
      LikesElement.classList.remove('liked');
    }
  },

  setComments(total) {
    const LikesElement = document.querySelector(
      '.component-footer-container-social-comments'
    );
    LikesElement.innerText = total;
  },
};
