const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
const start = source.indexOf('function programmeCommitmentEmailTemplate(');
const end = source.indexOf('function adminProgrammeEnquiryDetail(', start);
const context = vm.createContext({
  escapeHtml: value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  programmeStatusUrl: token => `https://example.invalid/review/${token}`
});
vm.runInContext(source.slice(start, end), context);
const school = {school_name:'Example <School>',contact_name:'Alex',contact_email:'alex@example.invalid',enquiry_type:'school_interest'};
for (const status of ['committed','confirmed']) {
  const html = context.adminProgrammeCommitmentEmailHtml({...school,status});
  assert(html.includes('Leadership meeting invitation'));
  assert(html.includes('Example &lt;School&gt;'));
  assert(html.includes('admin-copy-programme-email'));
  assert(html.includes('mailto:alex@example.invalid'));
  assert(html.includes('two or three suitable dates'));
}
for (const status of ['new','reviewing','active','declined']) assert.equal(context.adminProgrammeCommitmentEmailHtml({...school,status}),'');
assert.equal(context.adminProgrammeCommitmentEmailHtml({...school,status:'committed',enquiry_type:'partner_interest'}),'');
const previous = context.adminProgrammeCommitmentEmailHtml({...school,status:'shortlisted',public_token:'demo'});
assert(previous.includes('Commitment request email template'));
assert(!previous.includes('Leadership meeting invitation'));
const draft=context.programmeLeadershipMeetingEmailTemplate(school);
assert(draft.body.includes('Dr Megel Barker'));
assert(draft.body.includes('Embark Education'));
assert(!draft.body.includes('undefined'));
console.log('PASS: leadership draft stage eligibility, personalised escaped content, copy/email controls and existing commitment request.');
