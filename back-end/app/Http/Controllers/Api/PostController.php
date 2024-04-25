<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Jobs\NotifyAdminsOfCreatedPostJob;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    /**
     * Get the posts for the current user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return PostResource::collection(Post::all());
    }


    /**
     * @param \App\Http\Requests\PostRequest $request
     * @return \App\Http\Resources\PostResource
     */
    public function store(PostRequest $request): PostResource
    {
        $data = $request->validated();

        $data['user_id'] = auth()->id();

        $post = Post::create($data);

        NotifyAdminsOfCreatedPostJob::dispatch($post);

        return PostResource::make($post);
    }

    public function update(PostRequest $request, Post $post)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $post->update($data);

        return PostResource::make($post);
    }


    public function destroy(Post $post)
    {
        $post->delete();


        return response()->json([
            'message' => 'Post deleted',
        ], 200);
    }
}
