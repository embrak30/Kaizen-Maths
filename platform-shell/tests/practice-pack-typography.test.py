"""Prevent oversized exponents in practice-pack question and solution typography."""
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from practice_pack_style import math_markup
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
for size in [14,15,21,23]:
 paragraph=Paragraph(math_markup('2x^3 - x^2'),ParagraphStyle('math',fontName='STIX',fontSize=size,leading=size*1.25))
 powers=[fragment for fragment in paragraph.frags if getattr(fragment,'rise',0)>0]
 assert len(powers)==2
 for power in powers:
  assert abs(power.fontSize-size*.60)<1e-6
  assert abs(power.rise-size*.38)<1e-6
print('PASS: superscripts use 60% type size and 38% baseline rise for question, answer and solution sizes.')
