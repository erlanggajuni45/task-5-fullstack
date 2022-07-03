import React, { useContext } from "react";
import { ArticleContext } from "../Context/ArticleContext";
import moment from "moment";

function Home() {
    const { state, handleFunction } = useContext(ArticleContext);
    const { dataArticle } = state;
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    {dataArticle !== null &&
                        dataArticle.map((article) => {
                            console.log(article);
                            let {
                                id,
                                title,
                                content,
                                image,
                                created_at,
                                name,
                            } = article;
                            return (
                                <div class="card my-4">
                                    <div class="card-body" idx={id}>
                                        <h5 class="card-title">{title}</h5>
                                        <p class="card-text">{content}</p>
                                        <p class="card-text">
                                            <small class="text-muted">
                                                {moment(created_at).fromNow()}
                                            </small>
                                        </p>
                                    </div>
                                    <img
                                        src={image}
                                        class="card-img-bottom"
                                        alt={name}
                                        width="100"
                                        height="300"
                                    />
                                </div>
                            );
                        })}
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    Previous
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Home;
