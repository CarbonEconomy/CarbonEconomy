import 'package:flutter/material.dart';
import 'package:green_pouch/information/widgets/news.dart';

List<Article> MOCK_ARTICLE = [
  Article(
      title: 'How you can save the Earth with these SIMPLE STEPS!',
      url:
          'https://www.gardeningknowhow.com/wp-content/uploads/2020/11/cactus-garden-400x300.jpg',
      name: 'Cattie B',
      date: '1.1.21',
      userUrl:
          'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'),
  Article(
      title:
          'Eco-Friendly alternatives can save you this amount of money every SINGLE MONTH!',
      url:
          'https://greenerideal.com/wp-content/uploads/2013/02/green-money.jpg',
      name: 'Cat Detective',
      date: '1.2.21',
      userUrl:
          'https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&rect=37%2C29%2C4955%2C3293&q=45&auto=format&w=926&fit=clip')
];

class InformationView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ArticleList(MOCK_ARTICLE);
  }
}
