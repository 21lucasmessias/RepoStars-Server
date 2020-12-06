import Language from '../models/Language';

export default {
  render(language: Language) {
    return language.name;
  },

  renderMany(languages: Array<Language>) {
    return languages.map(language => {
      return this.render(language)
    })
  }
}