# Figures

## Requirements

Include the following in the preamble of your document:

```latex
\usepackage{graphicx}
\usepackage{subcaption}
```

## Requirements

Paper figures need to be rendered with latex to ensure that the fonts are consistent with the rest of the paper. Install latex and refresh the fonts available:

```bash
sudo apt update
sudo apt install texlive-xetex
sudo fc-cache -f -v  # clear font cache

# Potentially unnecessary:
sudo add-apt-repository multiverse
sudo apt install ttf-mscorefonts-installer
```

## Seaborn/Matplot Configurations

To use `Times New Roman` fonts and make your plots conform to conference requirements (no Type 3 fonts), use the following configurations in your figures script:

```python
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.colors as colors
import matplotlib.cm as cm
import matplotlib.ticker as ticker
from matplotlib.font_manager import FontProperties
from matplotlib.lines import Line2D

mpl.use("pgf")

params = {
    "text.usetex": True,
    "pgf.texsystem": "xelatex",
    "pgf.rcfonts": False,
    "font.size": 13,
    "pdf.fonttype": 42,
    "ps.fonttype": 42,
    "font.family": "serif",
    "font.serif": ["Times New Roman"],
    "pgf.preamble": r"""
        \usepackage{fontspec}
        \usepackage{unicode-math}
        \setmainfont{Times New Roman}
        \setmathfont{TeX Gyre Termes Math}
    """,
}
plt.rcParams.update(params)
sns.set_theme(context="paper", font_scale=1.4, style="white", rc=params)


# Set the palette
sns.color_palette()
sns.set_palette(sns.color_palette())

palette = sns.color_palette()
```

## Rendering

Your figures should then be rendered with the following command:

> **Note:** Exporting your figures as PDFs will ensure that they are vector-based and can be scaled without loss of quality.

```python
"""
{ plot code here... }
"""

plt.tight_layout()
plt.savefig('figure.pdf', bbox_inches='tight')
plt.show()
```

## Latex

### Single Figure

To insert your figure in a latex document, use the following code:

```latex
\begin{figure}[t]
    \centering
    \includegraphics[width=\linewidth]{./path/to/figure.pdf}
    \caption{}
\end{figure}
```

### Multi-Figure

To insert multiple figures in a latex document, use the following code:

> **Note:** The `subcaption` package is required to use the `subfigure` environment (`\usepackage{subcaption}`).

```latex
\begin{figure*}[t]
    \centering

    % You may also adjust the subfigure width with:
    % -> \begin{subfigure}{0.3\textwidth}
    \begin{subfigure}{\textwidth}
        \centering
        \caption{First image.}
        \label{subfigure:multi-figure-1-sub-1}

        % You may also define images to a specific height:
        % -> \includegraphics[height=9em]{./path/to/figure1.pdf}
        \includegraphics[width=\textwidth]{./path/to/figure1.pdf}
    \end{subfigure}

    \begin{subfigure}{\textwidth}
        \centering
        \caption{Second image.}
        \label{subfigure:multi-figure-1-sub-2}
        \includegraphics[width=\textwidth]{./path/to/figure2.pdf}
    \end{subfigure}

    \caption{Caption for the entire figure.}
    \label{figure:multi-figure-1}
\end{figure*}
```