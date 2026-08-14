import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(BASE, 'assets')
os.makedirs(ASSETS, exist_ok=True)


def lin(i, stops, x2=0, y2=1):
    s = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{i}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>'


PRODUCTS = [
    # (slug, code, tag, light, dark)
    ('retatrutide', 'RET', 'GLP-1', '#37b2f0', '#0e7cc0'),
    ('semaglutide', 'SEMA', 'GLP-1', '#5aa2ff', '#1f6ae0'),
    ('tirzepatide', 'TZP', 'GLP-1', '#7f8bff', '#3f4ad8'),
    ('cagrilintide', 'CAGRI', 'GLP-1', '#4fe0c8', '#0fa88f'),
    ('cagri-sema', 'CAG+SEMA', 'GLP-1', '#5aa2ff', '#1f4ae0'),
    ('mazdutide', 'MAZD', 'GLP-1', '#7f9dff', '#2f4ad8'),
    ('survodutide', 'SURV', 'GLP-1', '#9b8bff', '#4a3ad8'),
    ('tesamorelin', 'TESA', 'GRH', '#8a66ff', '#4a2fd0'),
    ('ipamorelin', 'IPA', 'GRH', '#b179ff', '#6d2fd0'),
    ('cjc-1295', 'CJC+IPA', 'BLEND', '#9b6bff', '#5a2fd0'),
    ('cjc-without-dac', 'CJC1295', 'GRH', '#8f7dff', '#4a3ad8'),
    ('cjc-with-dac', 'CJC-DAC', 'GRH', '#a17dff', '#6a2fd0'),
    ('sermorelin', 'SERM', 'GRH', '#a17dff', '#5a2fd0'),
    ('ghrp-2', 'GHRP-2', 'GRH', '#ff9dcb', '#d8448f'),
    ('ghrp-6', 'GHRP-6', 'GRH', '#ff8b9d', '#d83f5a'),
    ('hexarelin', 'HEXA', 'GRH', '#ffd76b', '#e0a61a'),
    ('peg-mgf', 'PEG-MGF', 'MYO', '#6ee8b0', '#1fb571'),
    ('igf-1-lr3', 'IGF-1', 'IGF', '#6ee8b0', '#1fb571'),
    ('epithalon', 'EPI', 'LON', '#7ee0d5', '#2cb8a8'),
    ('kisspeptin-10', 'KISS', 'GRH', '#ff9dcb', '#e0448f'),
    ('hmg', 'HMG', 'GRH', '#5aa2ff', '#1f6ae0'),
    ('gonadorelin', 'GONA', 'GRH', '#7faeff', '#3d6ae0'),
    ('follistatin', 'FOL', 'MYO', '#ffd76b', '#e0a61a'),
    ('follistatin-334', 'FOL-334', 'MYO', '#f5c44a', '#c98a12'),
    ('ghk-cu', 'GHK-CU', 'CU2+', '#3ad6c2', '#12a18f'),
    ('bpc-157', 'BPC-157', 'BPC', '#ffa04f', '#e06a12'),
    ('tb-500', 'TB-500', 'TB', '#ff7b6b', '#d43f2f'),
    ('bpc-tb-5', 'BPC+TB', 'BLEND', '#ffb37a', '#e06a2f'),
    ('bpc-tb-10', 'BPC+TB2', 'BLEND', '#ff8f6b', '#d84a20'),
    ('mots-c', 'MOTS-C', 'MOTS', '#d26be8', '#8f2fb8'),
    ('nad-plus', 'NAD+', 'NAD+', '#ffe066', '#e0a61a'),
    ('nmn', 'NMN', 'NMN', '#ffd15e', '#e09a12'),
    ('semax', 'SEMAX', 'NTP', '#d88bff', '#9636cf'),
    ('selank', 'SELANK', 'NTP', '#3ad6a8', '#0fa888'),
    ('melanotan-1', 'MT-I', 'MT', '#8fd0ff', '#3d8ee0'),
    ('melanotan-2', 'MT-II', 'MT', '#8fd0ff', '#3d8ee0'),
    ('pt-141', 'PT-141', 'PT', '#ff9bd4', '#d84aa0'),
    ('aod-9604', 'AOD', 'WL', '#ffd9a0', '#e0943f'),
    ('l-carnitine', 'CAR', 'LC', '#ff9d9d', '#d84040'),
    ('lipo-c', 'LIPO-C', 'WL', '#ffb37a', '#e07a2f'),
    ('adipotide', 'ADI', 'WL', '#ff9957', '#e05a17'),
    ('5-amino-1mq', '5-AMINO', 'MET', '#ff9d7a', '#e0582f'),
    ('aicar', 'AICAR', 'MET', '#6ee8a0', '#14b868'),
    ('slu-pp-332', 'SLU-332', 'MET', '#ffd06b', '#e09e1a'),
    ('lemon-bottle', 'LEMON', 'WL', '#ffd24a', '#d89e12'),
    ('kpv', 'KPV', 'PEP', '#38d6a8', '#0fa878'),
    ('ss-31', 'SS-31', 'MITO', '#8a8dff', '#4348d8'),
    ('b12', 'B12', 'VIT', '#ff7d7d', '#d83838'),
    ('melatonin', 'MEL', 'SLP', '#6f7fbf', '#3a4a8f'),
    ('cerebrolysin', 'CER', 'NPT', '#b58cff', '#7a44d8'),
    ('ll-37', 'LL-37', 'IMM', '#4fc3f7', '#1385b8'),
    ('thymalin', 'THYM', 'IMM', '#ffb37a', '#e07a2f'),
    ('thymosin-alpha-1', 'T-ALPHA', 'IMM', '#7fb8ff', '#3d6ae0'),
    ('ara-290', 'ARA-290', 'IMM', '#5ee0ff', '#148db8'),
    ('dsip', 'DSIP', 'SLP', '#7d8ad8', '#3a4a8f'),
    ('vip', 'VIP', 'PEP', '#a88bff', '#6a44d8'),
    ('oxytocin', 'OXY', 'PEP', '#ff9bd4', '#d84aa0'),
    ('glow', 'GLOW', 'SKN', '#ff9bd4', '#d84aa0'),
    ('klow', 'KLOW', 'SKN', '#d18bff', '#8a36cf'),
    ('glutathione', 'GLU', 'ANT', '#ffe066', '#d8a61a'),
    ('snap-8', 'SNAP-8', 'SKN', '#ff9dc8', '#d8448f'),
    ('adamax', 'ADAMAX', 'NTP', '#5ee8d0', '#14b896'),
    ('foxo4-dri', 'FOXO4', 'SEN', '#ff7f5e', '#d84820'),
    ('pinealon', 'PINE', 'NTP', '#6ee8a8', '#17b86a'),
    ('ace-031', 'ACE-031', 'MYO', '#9b7dff', '#4a2fd0'),
    ('hcg', 'HCG', 'HCG', '#ff8b8b', '#d83f3f'),
    ('acetic-acid-water', 'AAW', 'H2O', '#e0e6ff', '#8a96d8'),
    ('bacteriostatic-water', 'BAC', 'H2O', '#cfd8ff', '#7d8ad8'),
]


def vial(p):
    slug, code, tag, c1, c2 = p
    body = ('<defs>'
            + lin('glass', [('0', 'rgba(255,255,255,.85)'), ('0.12', 'rgba(255,255,255,.28)'),
                            ('0.55', 'rgba(255,255,255,.06)'), ('1', 'rgba(255,255,255,.16)')], y2=1)
            + lin('liq', [(0, c1), (1, c2)], y2=1)
            + lin('cap', [('0', '#5b5f6b'), ('0.5', '#2c2f38'), ('1', '#181a21')])
            + lin('caphi', [('0', '#9aa0b0'), ('0.5', '#454a56'), ('1', '#23262e')])
            + '<clipPath id="bodyc"><path d="M392 372 Q392 332 432 332 L592 332 Q632 332 632 372 L632 746 Q632 788 590 788 L434 788 Q392 788 392 746 Z"/></clipPath>'
            + '</defs>')
    parts = []
    parts.append('<ellipse cx="512" cy="886" rx="236" ry="34" fill="rgba(67,45,118,.16)"/>')
    parts.append('<rect x="464" y="292" width="96" height="42" rx="10" fill="url(#cap)"/>')
    parts.append('<path d="M452 268 Q452 252 468 252 L556 252 Q572 252 572 268 L572 300 Q572 316 556 316 L468 316 Q452 316 452 300 Z" fill="url(#caphi)"/>')
    parts.append('<rect x="452" y="228" width="120" height="58" rx="16" fill="url(#cap)"/>')
    parts.append('<rect x="452" y="228" width="120" height="14" rx="7" fill="rgba(255,255,255,.18)"/>')
    parts.append('<g clip-path="url(#bodyc)">'
                 '<path d="M392 372 Q392 332 432 332 L592 332 Q632 332 632 372 L632 746 Q632 788 590 788 L434 788 Q392 788 392 746 Z" fill="url(#liq)"/>'
                 '<rect x="392" y="470" width="240" height="80" fill="rgba(255,255,255,.16)"/>'
                 '<rect x="404" y="356" width="34" height="440" rx="17" fill="rgba(255,255,255,.5)"/>'
                 '<rect x="598" y="400" width="20" height="360" rx="10" fill="rgba(0,0,0,.10)"/>'
                 '</g>')
    parts.append('<path d="M392 372 Q392 332 432 332 L592 332 Q632 332 632 372 L632 746 Q632 788 590 788 L434 788 Q392 788 392 746 Z" fill="url(#glass)"/>')
    parts.append('<rect x="392" y="600" width="240" height="128" rx="16" fill="rgba(255,255,255,.92)"/>')
    parts.append(f'<text x="512" y="658" font-family="Arial, sans-serif" font-size="52" font-weight="800" fill="#432D76" text-anchor="middle" letter-spacing="1">{code}</text>')
    parts.append(f'<text x="512" y="706" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#8a7fa0" text-anchor="middle" letter-spacing="4">{tag}</text>')
    parts.append('<rect x="392" y="604" width="240" height="120" rx="16" fill="none" stroke="rgba(67,45,118,.14)" stroke-width="3"/>')
    parts.append('<rect x="438" y="262" width="148" height="26" rx="8" fill="rgba(255,255,255,.35)"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">{body}'
           + ''.join(parts) + '</svg>')
    with open(os.path.join(ASSETS, f'{slug}.svg'), 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f'wrote assets/{slug}.svg')


for p in PRODUCTS:
    vial(p)
