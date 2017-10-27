var DEFAULT_RPS = 1;
var CLASSES = [
  'avatar',
  'Avatar',
  'js-action-profile-avatar',
  'MomentUserByline-avatar',
  'ProfileAvatar-image',
  'ProfileCardMini-avatarImage'
];

var onPageLoad = function() {
  chrome.storage.local.get('rps', function (keyValuePair) {
    // rps shorts for *rotate per second*
    var rps = keyValuePair['rps'];
    // set 1 as default value if rotate-speed is not set in localStorage
    if (rps === undefined || rps === null) {
      rps = DEFAULT_RPS;
      chrome.storage.local.set({'rps': DEFAULT_RPS}, function () {});
    }

    var style = document.createElement('style');
    style.innerText += '.';
    style.innerText += CLASSES.join(', .') + ' ';
    style.innerText += '{';
    style.innerText += '    animation: spin ' + 1.0 / rps + 's linear infinite;';
    style.innerText += '}';

    // WebKit hack
    style.appendChild(document.createTextNode(''));

    document.head.appendChild(style);
  });
};
onPageLoad();

chrome.runtime.onMessage.addListener((message, sender, response) => {
  console.log(message);
  onPageLoad();
});
