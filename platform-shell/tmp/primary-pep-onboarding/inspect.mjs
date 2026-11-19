import fs from 'node:fs/promises';import{PresentationFile,FileBlob}from'@oai/artifact-tool';
const p=await PresentationFile.importPptx(await FileBlob.load('output/presentations/Kaizen-School-Welcome.pptx'));
const r=await p.inspect({kind:'slide,textbox',maxChars:30000});await fs.writeFile('tmp/primary-pep-onboarding/inspect.ndjson',r.ndjson);console.log(r.ndjson.slice(0,17000));
