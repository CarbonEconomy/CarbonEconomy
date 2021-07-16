import 'package:flutter/material.dart';

class Article {
  String title;
  String url;
  String name;
  String date;
  String userUrl;

  Article(
      {required this.title,
      required this.url,
      required this.name,
      required this.date,
      required this.userUrl});
}

class ArticleList extends StatelessWidget {
  List<Article> articles;
  ArticleList(this.articles);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: ListView.builder(
          shrinkWrap: true,
          scrollDirection: Axis.vertical,
          itemCount: articles.length,
          itemBuilder: (context, index) {
            return Center(
                child: Padding(
              padding: EdgeInsets.fromLTRB(0, 0, 0, 30),
              child: ArticleTile(articles[index]),
            ));
          }),
    );
  }
}

class ArticleTile extends StatelessWidget {
  final Article items;

  ArticleTile(this.items);
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          height: 145,
          width: 331,
          child: Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(15),
                      topRight: Radius.circular(15))),
              margin: EdgeInsets.zero,
              elevation: 10,
              child: ClipRRect(
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(15),
                    topRight: Radius.circular(15)),
                child: Image.network(
                  items.url,
                  fit: BoxFit.cover,
                ),
              )),
        ),
        Container(
          height: 118,
          width: 331,
          child: Card(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.only(
                    bottomRight: Radius.circular(15),
                    bottomLeft: Radius.circular(15))),
            elevation: 5,
            margin: EdgeInsets.zero,
            child: Padding(
              padding: EdgeInsets.fromLTRB(10, 5, 15, 0),
              child: Column(
                children: [
                  Text(
                    items.title,
                    textAlign: TextAlign.justify,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                        color: Color(0xFF36455A)),
                  ),
                  SizedBox(
                    height: 15,
                  ),
                  Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(50),
                        child: Image.network(
                          items.userUrl,
                          height: 35,
                          width: 35,
                          fit: BoxFit.cover,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            items.name,
                            style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 12,
                                color: Color(0xFF36455A)),
                          ),
                          SizedBox(height: 5.5),
                          Text(
                            items.date,
                            style: TextStyle(
                                color: Color(0xFFA1A8B9), fontSize: 10),
                          )
                        ],
                      ),
                      Expanded(
                          child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Icon(
                            Icons.bookmark_border,
                            color: Color(0xFFB9B9B9),
                            size: 24,
                          ),
                          Icon(
                            Icons.favorite_border_outlined,
                            color: Color(0xFFB9B9B9),
                            size: 24,
                          )
                        ],
                      ))
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
