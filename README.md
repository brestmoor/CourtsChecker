Subscription based web crawler, which checks if a badminton/tennis court becomes free in a time slot/date provided by user when subscribing.
It works by parsing HTML content of a court reservation service [twojtenis.pl](twojtenis.pl), as there is no API available.
If a court becomes free, a notification is send using service workers. It is designed to be deployed in Google Functions.
It is the back-end part for the front-end available [here](https://github.com/brestmoor/CourtsCheckerApp).

The entry point to this app is `pipeline.js`

All the keys and passwords used in the code have been deactivated.
