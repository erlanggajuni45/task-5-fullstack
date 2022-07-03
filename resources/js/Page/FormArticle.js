import React, { useContext } from "react";
import { ArticleContext } from "../Context/ArticleContext";

function FormArticle() {
    const { state, handleFunction } = useContext(ArticleContext);
    const { input, isDisabled, dataCategory } = state;
    const { handleChange, handleSubmit } = handleFunction;
    const { title, content, image, category } = input;
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card border-secondary">
                        <h5 className="card-header bg-secondary text-white text-center">
                            Post Baru
                        </h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="my-2">Judul Post</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="title"
                                        value={title}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="my-2">Isi Post</label>
                                    <textarea
                                        className="form-control"
                                        name="content"
                                        onChange={handleChange}
                                        value={content}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="my-2">Link gambar</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="image"
                                        value={image}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="my-2">Kategori</label>
                                    <select
                                        className="custom-select custom-select-sm"
                                        onChange={handleChange}
                                        name="category"
                                        value={category}
                                    >
                                        {dataCategory.map((category) => {
                                            const { id, name } = category;
                                            return (
                                                <option idx={id} value={id}>
                                                    {name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    disabled={isDisabled}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormArticle;
