import { NextResponse } from "next/server";

export async function POST(request, {params}){
    const url = params.id[0];
    const action = params.id[1];
    const apikey = params.id[2];

    const{post,post_meta,post_thumbnail,taxonomies} = await request.json();

    const slugify  = async(str) => {
        str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

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
    const post_name = slugify(post.title);
    const to_ping = post.to_ping;
    const pinged = post.pinged;
    const post_modified = post.post_modified;
    const post_modified_gmt = post.post_modified_gmt;
    const post_content_filtered = post.post_content_filtered;
    const post_parent = post.post_parent;
    const guid = "https:\/\/"+`${url}`+"\/?p="+`${ID}`;
    const menu_order = post.menu_order;
    const post_type = "post";
    const post_mime_type = post.post_mime_type;
    const comment_count = post.comment_count;
    const filter = post.filter;   
    const post_permalink = "https:\/\/"+`${url}`+"\/?p="+`${ID}`;

    //Send Data To Another Web
    if(post_title != "Auto Draft"){
        const sendData = async() => {
            await fetch("https://"+`${url}`+"/?wpwhpro_action="+`${action}`+"&wpwhpro_api_key="+`${apikey}`+"&action=create_post",{
            // await fetch("https://webhook.site/27d6ef8d-6b16-4698-a33e-cf7b4b64b38a",{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ID,post_author,post_title,post_content,post_date,post_date_gmt,post_excerpt,post_status,comment_status,ping_status,post_password,post_name,to_ping,pinged,post_modified,post_modified_gmt,post_content_filtered,post_parent,guid,menu_order,post_type,post_mime_type,comment_count,filter,post_meta,post_thumbnail,post_permalink,taxonomies}),
            });
        }
        await sendData();
    }
    //Response
    return NextResponse.json({message: "Data Terkirim!",post_permalink,action,apikey},{status:201}); 
}