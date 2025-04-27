"use client"

import { useQuery } from "@apollo/client"
import { GET_POSTS_DRAFTS } from "@/app/GraphqlOnClient/queries/postQueries"
import PostCard from "@/app/allpages/blog/[id]/components/Post"
import Link from "next/link"
import { useUser } from "@/app/context/authContext"
import { useTheme } from "@/app/context/themeContext"
import { PostsDraftsData } from "@/app/types/postTypes"

const PostsDrafts = () => {
    const { user } = useUser();
    const { theme } = useTheme();
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const {loading, error, data} = useQuery<PostsDraftsData>(GET_POSTS_DRAFTS, {
        context: {
            headers: {
                Authorization: accessToken ? `bearer ${accessToken}` : "",
            }
        }
    })

    if (loading)  return <p>Loading posts...</p>
    if (error) return <p>Error: {error.message}</p>

    return(
        <div>
            <h2>My posts drafts</h2>
            {data?.getPostDrafts.length ? (
                <ul>
                    {data?.getPostDrafts?.map((post) => ( 
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                           
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts drafts found.</p>
            )
        }
        </div>
    )
}
export default PostsDrafts;
