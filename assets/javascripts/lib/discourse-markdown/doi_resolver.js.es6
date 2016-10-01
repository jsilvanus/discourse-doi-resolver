import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['doi-resolver'] = true;
});

function resolveDOI (text) { 
  return text.replace(/(10.\d{4,9}\/[-._;()\/:A-Z0-9]+)/gi, 
		      "<a class=\"doi\" href=\"https:\/\/doi.org/$1\">$1</a>");
}

export function setup(helper) {

  helper.whitelist([ 'a.doi' ]);
  helper.postProcessText(function (text) {
    text = [].concat(text);
    for (var i = 0; i < text.length; i++) {
      if (text[i].length > 0 && text[i][0] !== "<") {
        text[i] = resolveDOI(text[i]);
      }
    }
    return text;
  });
}
