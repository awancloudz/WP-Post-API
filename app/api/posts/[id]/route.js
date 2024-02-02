import { NextResponse } from "next/server";

export async function POST(request, {params}){
    const url = params.id;
    const{post,post_meta,post_thumbnail,taxonomies} = await request.json();
    const ID = post.ID;
    const post_author = post.post_author;
    const post_title = post.post_title;
    const post_content = post.post_content;
    const post_date = post.post_date;
    const post_date_gmt = post.post_date_gmt;
    const post_excerpt = post.post_excerpt;
    const post_status = "publish";
    const comment_status = "close";
    const ping_status = "open";
    const post_password = post.post_password;
    const post_name = post.post_name;
    const to_ping = post.to_ping;
    const pinged = post.pinged;
    const post_modified = post.post_modified;
    const post_modified_gmt = post.post_modified_gmt;
    const post_content_filtered = post.post_content_filtered;
    const post_parent = 0;
    const guid = "https:\/\/"+`${url}`+"\/?p="+`${ID}`;
    const menu_order = post.menu_order;
    const post_type = "post";
    const post_mime_type = post.post_mime_type;
    const comment_count = post.comment_count;
    const filter = post.filter;   
    const post_permalink = "https:\/\/"+`${url}`+"\/?p="+`${ID}`;

    //Send Data To Another Web
    const sendData = async() => {
        await fetch("https://ujicoba2.polressemarangkab.com/?wpwhpro_action=main_8829&wpwhpro_api_key=r79cwjl1up40xxc45qrdjonbuzuletgz38bgpqgdkpw5yvx1jkfbquzsnehrbcro&action=create_post",{
        // await fetch("https://webhook.site/27d6ef8d-6b16-4698-a33e-cf7b4b64b38a",{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ID,post_author,post_title,post_content,post_date,post_date_gmt,post_excerpt,post_status,comment_status,ping_status,post_password,post_name,to_ping,pinged,post_modified,post_modified_gmt,post_content_filtered,post_parent,guid,menu_order,post_type,post_mime_type,comment_count,filter,post_meta,post_thumbnail,post_permalink,taxonomies}),
        });
    }
    await sendData();

    //Response
    return NextResponse.json({message: "Data Terkirim!",post_permalink},{status:201});   
}