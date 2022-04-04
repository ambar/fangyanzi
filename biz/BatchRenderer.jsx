import chunk from 'lodash/chunk'
import {useEffect, useMemo, useState} from 'react'

const queueTask = (callback) => {
  const {port1, port2} = new MessageChannel()
  port2.onmessage = () => callback()
  port1.postMessage('')
  port1.close()
}

const postPaint = (fn) => {
  const rafId = requestAnimationFrame(() => queueTask(fn))
  return () => {
    cancelAnimationFrame(rafId)
  }
}

const BatchRenderer = ({items, children, size = 200}) => {
  const chunked = useMemo(() => chunk(items, size), [items, size])
  const [chunkNo, setChunkNo] = useState(0)

  useEffect(() => {
    setChunkNo(0)
  }, [chunked])

  useEffect(() => {
    const chunkCount = chunked.length
    if (chunkCount && chunkNo < chunkCount - 1) {
      return postPaint(() => setChunkNo((x) => x + 1))
    }
  }, [chunked, chunkNo])

  return chunked.map((chunk, i) => (chunkNo >= i ? chunk.map(children) : null))
}

export default BatchRenderer
