import { useState, useEffect } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

import styles from '../styles/index.module.css'

export default function Index() {
  const [markdownText, setMarkdownText] = useState('')

  useEffect(() => {
    const markdownTextFromLocalStorage = localStorage.getItem('markdownText')

    if (markdownTextFromLocalStorage) {
      setMarkdownText(markdownTextFromLocalStorage)
    } else {
      fetch("./markdown.md")
      .then(response => response.text())
      .then((response) => {
          setMarkdownText(response)
      })
    }
  }, [])

  function handleMarkdownChange(event) {
    const newMarkdownText = event.target.value

    setMarkdownText(newMarkdownText)
    localStorage.setItem('markdownText', newMarkdownText)
  }

  const processedHtml = remark()
    .use(html)
    .use(gfm)
    .processSync(markdownText)
    .toString()

  return (
    <main className={styles.main}>
      <div className={styles.markdownEditor}>
        <textarea value={markdownText} onChange={handleMarkdownChange} />
      </div>
      <div
        className={styles.markdownPreview}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </main>
  )
}
