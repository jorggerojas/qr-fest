import type { NextPage } from 'next'
import { Header } from '../components'
import useGoogleSheets from 'use-google-sheets'

const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const Scan: NextPage = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: GOOGLE_API_KEY ?? '',
    sheetId: GOOGLE_SHEET_ID ?? '',
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return (
      <p>
        <>Error: {JSON.stringify(error)}</>
      </p>
    )
  }
  return (
    <div>
      <Header />
      scan
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default Scan
