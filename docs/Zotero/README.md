# Zotero Configurations

These configurations are helpful for writing papers and managing references, using [Zotero](https://www.zotero.org/).

## Preferences

### Export

- **Quick Copy:** `Item Format: Better BibTeX`

## Better Bibtex Configurations

[Better Bibtex](https://github.com/retorquere/zotero-better-bibtex) helps you export your Zotero library in a more flexible way. 

### Fields to Omit:

Removing these fields produces more concise BibTeX files:

```
file,keywords,abstract,url,series,address,location,publisher,month,urldate,langid
```

### Postscript:

The script below produces better [arXiv](https://arxiv.org/) paper exports:

```javascript
if (Translator.BetterTeX && zotero.arXiv) {
  tex.entrytype = 'article';
  tex.add({ name: 'journal', value: `arXiv preprint arXiv:${zotero.arXiv.id}` });
  tex.remove('number');
  tex.remove('eprint');
  if (!tex.has.journaltitle) { 
    tex.add({ name: 'journaltitle', bibtex: '{}' }); 
  }
}
```

## Actions / Tags

[Actions and Tags](https://github.com/windingwind/zotero-actions-tags) lets you define custom functions for Zotero.

### GPTag

This script enables you to query a language model to automatically tag papers using their abstracts.

**Settings:**
- Event: `None`
- Operation: `Script`
- Data: `{...Code...}`
- Shortcut: `[No Shortcut]`
- [x] In Item Menu
- [ ] In Collection Menu
- [x] In Tools Menu
- [x] In Reader Menu
- [ ] In Annotation Menu
- [x] Enabled

**Code:**

```javascript
const BASE_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '...';

if (!item) return;

const { Zotero, Zotero_Tabs, console, alert } = require('window');
const popMsg = new Zotero.ProgressWindow();
const progMeter = new popMsg.ItemProgress('chrome://zotero/skin/tick.png', 'Thinking...');
const reader = Zotero.Reader.getByTabID(Zotero_Tabs.selectedID);

const abstract = item.getField('abstractNote');
if (!abstract) return;

const payload = {
	model: 'gpt-3.5-turbo',
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant, which generates up to 5 keywords (to be used for tagging) for a given paper abstract. Tags should be returned as comma-separated words and must be on one-line."
      },
      {
        "role": "user",
        "content": `Abstract: ${abstract}`
      }
    ]
};

Zotero.HTTP.doPost(
	BASE_URL,
	JSON.stringify(payload),
	resp => {
		console.debug('Action response', resp);
		const res = JSON.parse(resp.response);
		
		if (resp.status != 200) {
			progMeter.setIcon('chrome://zotero/skin/cross.png');
			progMeter.setText(res.statusCode);
			new popMsg.ItemProgress('', res.message);
		} else {
			const dat = res.choices[0];
			const response = dat.message.content;
						
			if (response) {
				const tags = response.trim().split(',');
				for (const tag of tags) {
					console.log(`adding tag: ${tag}`);
					item.addTag(tag.trim());
				}
			}

			progMeter.setProgress(100);
			progMeter.setText(`Finished [${dat.finish_reason}]`);
			new popMsg.ItemProgress('', dat.message.content);			
		}
	},
	{ 
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + API_KEY  // for OpenAI 
	}
);

popMsg.changeHeadline('Action:', 'Successfully added tags');
popMsg.show();
```
