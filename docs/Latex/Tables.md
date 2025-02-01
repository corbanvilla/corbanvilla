# Tables

## Requirements

Include the following in the preamble of your document:

```latex
\usepackage{booktabs}
\usepackage{tabularx}
```

## Python

I highly recommend generating tables with Python using the [`pandas` library](https://pandas.pydata.org/docs/reference/api/pandas.io.formats.style.Styler.to_latex.html). Here are some examples of how you can generate tables with various formatting options.

## Basic Table Configurations

```python
"""
df = ... <-- load your data
"""

latex = (
        (
        df
        .style
        # hide the index
        .hide(axis="index")
        # hide a column
        .hide(subset=["ColumnName"], axis="columns")
        # escape special characters for latex
        .format(escape="latex")
        # return the latex string
        .to_latex(
            hrules=True,
            caption="Table caption.",
            label="table:label-1",
            convert_css=True,
            position='t',
            environment="table*",  # 2-column table
            # [optional] evenly distribute columns (with tabularx)
            column_format="X"*(df.index.nlevels + len(df.columns)), 
        )
    )
    # update to tabularx
    .replace(r"\begin{tabular}", r"\begin{tabularx}{\textwidth}")
    .replace(r"\end{tabular}", r"\end{tabularx}")
)

# write to a file
with open("../tables/table1.tex", "w") as f:
    f.write(latex)
print(latex)
```

### Styling Parameters

The following calls can be added to a `df.style` object to style your table:

```python
# rotate column headers
df.style.map_index(lambda _: r"rotatebox:{45}--rwrap--latex;", axis=1)

# apply formatting to a specific row header
df.style.apply_index(lambda x: [("textbf:--rwrap--latex;" if header == "Total" else None) for header in x], axis=0, level=0)

# apply formatting to a specific element (conditionally)
.apply(lambda x: [f"textbf:--rwrap--latex;" if x.Compare == True else None] + [None for _ in range(x.size-1)], axis=1)
```
