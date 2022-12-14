import {
  Box,
  Heading,
  Spacer,
  Button,
  VStack,
  HStack,
  Grid,
  Text,
  Link,
  Image,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useSWR from 'swr'
import { useState } from 'react'
import SkeletonCards from './skeleton'

const HeaderBtn = styled(Button)`
  position: relative;
  padding: 0.4rem 0.5rem;
  font-weight: normal;

  &:hover {
    color: #3b49df;

    &::after {
      width: 100%;
    }
  }

  &:focus {
    box-shadow: none;
  }

  ${(props) =>
    props.isCurrent &&
    css`
      font-weight: 500;

      &::after {
        transition: width 0.2s ease;
        position: absolute;
        bottom: 0;
        margin: auto;
        content: '';
        height: 3px;
        width: 70%;
        border-radius: 4px;
        background-color: #3b49df;
      }
    `}
`

const Header = ({ isActive, setIsActive }) => {
  return (
    <Box as="header">
      <HStack spacing=".6rem">
        <Heading fontSize="1.25rem">Posts</Heading>
        <Spacer />
        {timeperiods.map((item, idx) => {
          if (isActive === item) {
            return (
              <HeaderBtn
                key={idx}
                isCurrent={isActive}
                onClick={() => setIsActive(item)}
              >
                {item}
              </HeaderBtn>
            )
          }
          return (
            <HeaderBtn key={idx} onClick={() => setIsActive(item)}>
              {item}
            </HeaderBtn>
          )
        })}
      </HStack>
    </Box>
  )
}

function Card({
  title,
  username,
  userProfile,
  publishedDate,
  tagList,
  headerImage,
  postLink,
  readingTime,
  reactionCount,
  commentCount,
}) {
  return (
    <Box
      mt="3"
      as="article"
      bg="white"
      borderRadius="md"
      overflow="hidden"
      border="1px solid #08090a1a"
    >
      {headerImage ? <Image src={headerImage} /> : ''}
      <Grid
        templateColumns={{ base: '1fr', sm: 'max-content 1fr' }}
        gap={2}
        p={4}
      >
        {/* <Image src={userProfile} w="8" borderRadius="full" /> */}

        <HStack d={{ base: 'flex', sm: 'block' }}>
          <Image
            alt="user profile"
            src={userProfile}
            w="8"
            borderRadius="full"
          />
          <VStack
            align="flex-start"
            spacing={0}
            d={{ base: 'flex', sm: 'none' }}
          >
            <Text color="#4d5760" fontSize="14px" fontWeight="500">
              {username}
            </Text>
            <Text color="#4d5760" fontSize="12px">
              {publishedDate}
            </Text>
          </VStack>
        </HStack>
        <Box>
          <VStack
            align="flex-start"
            spacing={0}
            d={{ base: 'none', sm: 'flex' }}
          >
            <Text color="#4d5760" fontSize="14px" fontWeight="500">
              {username}
            </Text>
            <Text color="#4d5760" fontSize="12px">
              {publishedDate}
            </Text>
          </VStack>
          <Heading fontSize={headerImage ? '30px' : '24px'} mt="3">
            <Link
              href={postLink}
              _hover={{ color: '#323ebe', textDecoration: 'none' }}
              isExternal
            >
              {title}
            </Link>
          </Heading>
          <HStack mt="3" fontSize="14px" color="#64707d">
            {tagList.map((tag, idx) => (
              <Text as={Link} key={idx}>
                #{tag}
              </Text>
            ))}
          </HStack>
          <HStack mt={3}>
            <Button
              leftIcon={<Image src="/assets/images/like.svg" />}
              ml={-2}
              bg="transparent"
              padding="6px 8px"
              height="auto"
              fontWeight="normal"
              fontSize="14px"
              lineHeight="1.2"
              borderRadius="4px"
              _hover={{ bg: '#f6f6f6' }}
            >
              {reactionCount}
              <Box ml="2" as="span" d={{ base: 'none', sm: 'block' }}>
                reactions
              </Box>
            </Button>
            <Button
              leftIcon={<Image src="/assets/images/comment.svg" />}
              bg="transparent"
              padding="6px 8px"
              height="auto"
              fontWeight="normal"
              fontSize="14px"
              lineHeight="1.2"
              borderRadius="4px"
              _hover={{ bg: '#f6f6f6' }}
            >
              {commentCount}
              <Box ml="2" as="span" d={{ base: 'none', sm: 'block' }}>
                comments
              </Box>
            </Button>
            <Spacer />
            <Text fontSize="12px">{readingTime} min read</Text>
            <Button
              bg="#d2d6db"
              padding="8px 12px"
              height="auto"
              fontWeight="normal"
              fontSize="14px"
              _hover={{ bg: '#b5bdc4' }}
            >
              Save
            </Button>
          </HStack>
        </Box>
      </Grid>
    </Box>
  )
}

const fetcher = (url) => fetch(url).then((res) => res.json())

const timeperiods = ['Most Relevant', 'Newest', 'Oldest']
function returnFetchUrl(isActive) {
  if (isActive === 'Most Relevant') {
    return ''
  }
  return isActive.toLowerCase()
}

const Posts = () => {
  const token = "oqMd5YT5kx62CnMmQjFwwBiw"
  const [isActive, setIsActive] = useState(timeperiods[3])
  const { data, error } = useSWR(
    [`https://dev.to/search/feed_content?per_page=15&page=0&user_id=651568&class_name=Article&sort_by=published_at&sort_direction=desc&approved=`,token],
    fetcher
  )
  
  if (error) return <Box>failed to load</Box>
  if (!data)
    return (
      <Box mb="8" borderRadius="md">
        <Header isActive={isActive} setIsActive={setIsActive} />
        <SkeletonCards />
      </Box>
    )

  return (
    <Box mb="8" borderRadius="md">
      <Header isActive={isActive} setIsActive={setIsActive} />
      {data.result.map((post, idx) => (
        <Card
          key={post.id}
          title={post.title}
          username={post.user.name}
          tagList={post.tag_list}
          readingTime={post.reading_time}
          commentCount={post.comments_count}
          reactionCount={post.public_reactions_count}
          postLink={`https://dev.to${post.path}`}
          publishedDate={post.readable_publish_date}
          userProfile={post.user.profile_image_90}
          headerImage={idx === 0 ? post.cloudinary_video_url : ''}
        />
      ))}
    </Box>
  )
}

export default Posts
