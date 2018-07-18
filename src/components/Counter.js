import React from 'react'
import styled from 'styled-components'




const Container = styled.div`
	width: 200px;
	padding: 5px;
	border-radius: 100%;
	position: absolute;
	right: 0;
	top: 0;
	
	>h2 {
		color: #aC0a1a;
	}

`

export default props => {
	return (
		<Container>
			<h2>{`Time Elasped: ${props.timer}`}</h2>
		</Container>
	)
}