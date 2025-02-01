# Listings

## Requirements

Include the following in the preamble of your document:

```latex
\usepackage{listings}
\usepackage{xcolor}
```

## Style Definitions

I define the following styles for code listings:

```latex
\definecolor{mGreen}{rgb}{0,0.6,0}
\definecolor{mGray}{rgb}{0.5,0.5,0.5}
\definecolor{mPurple}{rgb}{0.58,0,0.82}
\definecolor{backgroundColor}{rgb}{1,1,1}
\definecolor{lightgreen}{rgb}{0.8,1.0,0.8}
\definecolor{darkgreen}{rgb}{0.0, 0.5, 0.0}
\definecolor{diffstart}{named}{blue}
\definecolor{diffrem}{named}{red}
\definecolor{black}{named}{black}


\lstdefinestyle{CStyle}{
    backgroundcolor=\color{backgroundColor},   
    commentstyle=\color{mGreen},
    keywordstyle=\color{mGray},
    numberstyle=\tiny\color{mGray},
    stringstyle=\color{black},
    basicstyle=\footnotesize\sffamily,
    breakatwhitespace=false,         
    breaklines=true,                 
    captionpos=b,                    
    keepspaces=true,                 
    numbers=left,                    
    numbersep=5pt,                  
    showspaces=false,                
    showstringspaces=false,
    showtabs=false,                  
    tabsize=2,
    breakindent=0pt,
    language=C,
    moredelim=**[is][\color{diffrem}]{\\-}{\\-}, % \- enables red (diff)
    moredelim=**[is][\color{darkgreen}]{\\+}{\\+}, % \+ enables green (diff)
    moredelim=**[is][\color{mGray}]{\\gray}{\\gray}, % \gray enables gray
    moredelim=**[is][\color{mPurple}]{\\purple}{\\purple}, % \purple enables purple
    moredelim=**[is][\bfseries]{\\b}{\\b},  % \b enables bold
    moredelim=**[is][\mdseries]{\\ub}{\\ub},  % \ub disables bold
    moredelim=**[is][\color{black}]{\\uc}{\\uc},  % \uc enables black
}
```

## Example Listing

You can then include a code listing in your document with the following code:

```latex
\begin{figure}[h!]
  \begin{minipage}{\linewidth}
    \begin{lstlisting}[style=CStyle, frame=single, caption={Sample caption.},captionpos=b, label=listing:listing-1]
\bSource Code:
\ubFOR a := 0 TO 10 BY -1 DO;
    printf('Hello %d!$N', a);
END_FOR;

\bLLVM IR:
\ubcondition_check:            ; preds = %increment, %entry
  %load_a = load i16, i16* %a, align 2, !dbg !22
  %load_a1 = load i16, i16* %a, align 2, !dbg !22
\-- %tmpVar = icmp sle i16 %load_a1, 10, !dbg !22\uc
\++ %tmpVar = icmp sge i16 %load_a1, 10, !dbg !22\uc
...
\end{lstlisting}
  \end{minipage}
\end{figure}
```