'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var getRandomData = function (arrayData) {
  return arrayData[getRandomInt(0, arrayData.length)];
};

/* ------------------------data------------------------------ */

var photos = [];
var fragment = document.createDocumentFragment();

/* --------------------------mok----------------------------- */

var NUMBER_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 0;
var MAX_COMMENTS = 6;

var mokCommentTexts = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var mokNames = ['Саша', 'Сергей', 'Лёха', 'Настя', 'Маша', 'Катя'];

var mokPhotos = function (data, number) {
  for (var i = 0; i < number; i++) {
    data[i] = {comments: []};
    data[i].url = 'photos/' + (i + 1) + '.jpg';
    data[i].likes = getRandomInt(MIN_LIKES, MAX_LIKES);
    var numberComments = getRandomInt(MIN_COMMENTS, MAX_COMMENTS);
    for (var j = 0; j < numberComments; j++) {
      data[i].comments[j] = {};
      data[i].comments[j].avatar = 'img/avatar-' + (j + 1) + '.svg';
      data[i].comments[j].message = getRandomData(mokCommentTexts);
      data[i].comments[j].name = getRandomData(mokNames);
    }
  }
};

mokPhotos(photos, NUMBER_PHOTOS);

/* -----------------------picture---------------------------- */

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureImage = pictureTemplate.querySelector('.picture__img');
var pictureLike = pictureTemplate.querySelector('.picture__likes');
var pictureComments = pictureTemplate.querySelector('.picture__comments');

var fillDataToPicture = function (data) {
  pictureImage.src = data.url;
  pictureLike.textContent = data.likes.toString();
  pictureComments.textContent = data.comments.length.toString();
};

var createPictures = function (data) {
  for (var i = 0; i < data.length; i++) {
    fillDataToPicture(data[i]);
    fragment.appendChild(pictureTemplate.cloneNode(true));
  }
  picturesContainer.appendChild(fragment);
};

createPictures(photos);

/* -------------------big-picture-------------------- */

var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikes = bigPicture.querySelector('.likes-count');
var bigPictureNumberComments = bigPicture.querySelector('.comments-count');

var bigPictureCommentList = bigPicture.querySelector('.social__comments');
var bigPictureCommentTemplate = bigPicture.querySelector('.social__comment');
var bigPictureCommentAvatar = bigPictureCommentTemplate.querySelector('.social__picture');
var bigPictureCommentText = bigPictureCommentTemplate.querySelector('.social__text');

var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');


var fillBigPicture = function (data) {
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes.toString();
  bigPictureNumberComments.textContent = data.comments.length.toString();
  var comments = data.comments;
  bigPictureCommentList.innerHTML = '';
  for (var i = 0; i < comments.length; i++) {
    bigPictureCommentAvatar.src = comments[i].avatar;
    bigPictureCommentText.textContent = comments[i].message;
    fragment.appendChild(bigPictureCommentTemplate.cloneNode(true));
  }
  bigPictureCommentList.appendChild(fragment);
};

var showBigPicture = function () {
  fillBigPicture(photos[0]);
  bigPicture.classList.remove('hidden');
  bigPictureSocialCommentCount.classList.add('hidden');
  bigPictureCommentLoader.classList.add('hidden');
};

showBigPicture();
