export default class Post {
  constructor(title) {
    this.date = new Date();
    this.title = title;
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON()
    });
  }
}
