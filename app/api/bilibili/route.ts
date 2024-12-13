import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const seasonId = searchParams.get('seasonId')

  if (!seasonId) {
    console.error('No seasonId provided')
    return NextResponse.json({ error: 'seasonId is required' }, { status: 400 })
  }

  try {
    console.log(`Fetching bilibili data for seasonId: ${seasonId}`)
    
    const response = await fetch(
      `https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=3048495&season_id=${seasonId}&sort_reverse=false&page_num=1&page_size=30`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://space.bilibili.com',
          'Accept': 'application/json'
        },
        next: { revalidate: 3600 } // 缓存1小时
      }
    )

    if (!response.ok) {
      console.error(`Bilibili API responded with status: ${response.status}`)
      return NextResponse.json(
        { error: `API responded with status: ${response.status}` }, 
        { status: response.status }
      )
    }

    const data = await response.json()
    
    if (data.code !== 0) {
      console.error(`Bilibili API returned error code: ${data.code}, message: ${data.message}`)
      return NextResponse.json(
        { error: data.message || 'Failed to fetch bilibili videos' }, 
        { status: 500 }
      )
    }

    console.log(`Successfully fetched ${data.data.archives?.length || 0} videos`)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching bilibili data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' }, 
      { status: 500 }
    )
  }
} 