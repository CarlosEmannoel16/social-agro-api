export class GenerateFastId {
  static create(dateOfCreation: Date, animalName: string) {
    return `${dateOfCreation.getMinutes()}${animalName[0].toUpperCase()}${animalName[
      animalName.length - 1
    ].toUpperCase()}${Math.floor(Math.random() * 10) + 1}${chatRandom()}`;
  }
}


function chatRandom() {
  const unicode = Math.floor(Math.random() * 26) + 97;
  return String.fromCharCode(unicode).toUpperCase()
}