import model from './model';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendsAndPhotos(friend, id, url);
  },

  setFriendsAndPhotos(friend, id, url) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url('${url}')`;
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
  },
};
