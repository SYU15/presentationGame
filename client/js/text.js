var text = [
  "Hi, I'm purple.",
  "These stars smell funny.",
  "Why is this box following me?",
  "I'd be fine if this thing was out of my way.",
  "I wonder why I wear the same thing everyday."
];

var randomText = function() {
  console.log('called');
  var newIndex = Math.floor(Math.random() * text.length);
  dialogText.text = text[newIndex];
};
