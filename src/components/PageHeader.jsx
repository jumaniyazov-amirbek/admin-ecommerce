import React from 'react'
import { Row, Typography } from 'antd'

function PageHeader({title, extra}) {
  return (
    <Row justify='space-between'>
        <Typography.Title>{title}</Typography.Title>
        {extra}
    </Row>
  )
}

export default PageHeader