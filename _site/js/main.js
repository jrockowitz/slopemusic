/**
 * @file
 * Javascript Behaviors
 */

(function ($) {

  "use strict";

  /**
   * Contact Form
   */
  $('#contact').submit(function() {
    // Set the form action using javascript helps obscure my email address
    // and prevent bots from easily submitting the form.
    this.action = '//formspree.io/' + ['slopemusic', 'gmail.com'].join('@');
    this._next.value = '//' + location.host + '/contact/thanks/';
  });


})(jQuery);


