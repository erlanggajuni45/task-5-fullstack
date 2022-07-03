<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('articles')
                ->join('categories', 'articles.category_id', '=', 'categories.id')
                ->orderBy('articles.created_at')
                ->select('articles.*', 'categories.name')
                ->paginate(5);
    }

    public function myArticle($id)
    {
        return DB::table('articles')
                ->join('categories', 'articles.category_id', '=', 'categories.id')
                ->where('articles.user_id', $id)
                ->select('articles.*', 'categories.name')
                ->paginate(5);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'required',
            'user_id' => 'required',
            'category_id' => 'required',
        ]);

        return Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->image,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Article::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        $article->update($request->all());
        return $article;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = Article::destroy($id);

        if ( $delete ) {
            return response(["message" => "Hapus artikel berhasil"]);
        }
        else {
            return response(["message" => "Hapus artikel gagal"]);
        }
    }
}
