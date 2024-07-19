import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questions: Question[] = [
    // Creation topic
    { question: 'Who built the ark?', options: ['Noah', 'Moses', 'Abraham', 'David'], answer: 'Noah', difficulty: 1, topic: 'Creation' },
    { question: 'What did God create on the first day?', options: ['Light', 'Sky', 'Land', 'Plants'], answer: 'Light', difficulty: 1, topic: 'Creation' },
    { question: 'Who was the first man?', options: ['Adam', 'Noah', 'Abraham', 'David'], answer: 'Adam', difficulty: 1, topic: 'Creation' },
    { question: 'Who was the first woman?', options: ['Eve', 'Sarah', 'Rebekah', 'Rachel'], answer: 'Eve', difficulty: 1, topic: 'Creation' },
    { question: 'What did God create on the seventh day?', options: ['Rested', 'Animals', 'Plants', 'Humans'], answer: 'Rested', difficulty: 2, topic: 'Creation' },
    { question: 'Who named the animals?', options: ['Adam', 'Noah', 'Abraham', 'David'], answer: 'Adam', difficulty: 2, topic: 'Creation' },
    { question: 'What was the forbidden fruit?', options: ['Apple', 'Fig', 'Grape', 'Banana'], answer: 'Apple', difficulty: 2, topic: 'Creation' },
    { question: 'Who tempted Eve to eat the forbidden fruit?', options: ['Serpent', 'Lion', 'Tiger', 'Bear'], answer: 'Serpent', difficulty: 3, topic: 'Creation' },
    { question: 'What was created on the fourth day?', options: ['Sun, Moon, and Stars', 'Land and Sea', 'Birds and Fish', 'Animals'], answer: 'Sun, Moon, and Stars', difficulty: 3, topic: 'Creation' },
    // Prophets topic
    { question: 'Who was swallowed by a great fish?', options: ['Jonah', 'Daniel', 'Elijah', 'Elisha'], answer: 'Jonah', difficulty: 2, topic: 'Prophets' },
    { question: 'Who confronted the prophets of Baal?', options: ['Elijah', 'Elisha', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3, topic: 'Prophets' },
    { question: 'Who had a vision of dry bones?', options: ['Ezekiel', 'Isaiah', 'Jeremiah', 'Daniel'], answer: 'Ezekiel', difficulty: 3, topic: 'Prophets' },
    { question: 'Who interpreted Pharaoh\'s dreams?', options: ['Joseph', 'Daniel', 'Moses', 'Aaron'], answer: 'Joseph', difficulty: 3, topic: 'Prophets' },
    { question: 'Who was taken up to heaven in a whirlwind?', options: ['Elijah', 'Enoch', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3, topic: 'Prophets' },
    { question: 'Who prophesied about the valley of dry bones?', options: ['Ezekiel', 'Isaiah', 'Jeremiah', 'Daniel'], answer: 'Ezekiel', difficulty: 3, topic: 'Prophets' },
    { question: 'Who was the prophet that confronted King Ahab?', options: ['Elijah', 'Elisha', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3, topic: 'Prophets' },
    { question: 'Who prophesied the coming of the Messiah?', options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'], answer: 'Isaiah', difficulty: 3, topic: 'Prophets' },
    // Life of Jesus topic
    { question: 'Where was Jesus born?', options: ['Nazareth', 'Bethlehem', 'Jerusalem', 'Galilee'], answer: 'Bethlehem', difficulty: 1, topic: 'Life of Jesus' },
    { question: 'Who baptized Jesus?', options: ['John the Baptist', 'Peter', 'Paul', 'James'], answer: 'John the Baptist', difficulty: 1, topic: 'Life of Jesus' },
    { question: 'What was Jesus\' first miracle?', options: ['Turning water into wine', 'Feeding the 5000', 'Walking on water', 'Healing the blind man'], answer: 'Turning water into wine', difficulty: 2, topic: 'Life of Jesus' },
    { question: 'Who were Jesus\' first disciples?', options: ['Peter and Andrew', 'James and John', 'Philip and Bartholomew', 'Matthew and Thomas'], answer: 'Peter and Andrew', difficulty: 2, topic: 'Life of Jesus' },
    { question: 'Who denied Jesus three times?', options: ['Peter', 'Judas', 'John', 'Thomas'], answer: 'Peter', difficulty: 1, topic: 'Life of Jesus' },
    { question: 'Who betrayed Jesus?', options: ['Judas Iscariot', 'Peter', 'John', 'Thomas'], answer: 'Judas Iscariot', difficulty: 1, topic: 'Life of Jesus' },
    { question: 'What was Jesus\' profession before his ministry?', options: ['Carpenter', 'Fisherman', 'Shepherd', 'Teacher'], answer: 'Carpenter', difficulty: 1, topic: 'Life of Jesus' },
    { question: 'Who raised Lazarus from the dead?', options: ['Jesus', 'Peter', 'Paul', 'John'], answer: 'Jesus', difficulty: 2, topic: 'Life of Jesus' },
    // Exodus topic
    { question: 'Who received the Ten Commandments?', options: ['Moses', 'Aaron', 'Joshua', 'Joseph'], answer: 'Moses', difficulty: 1, topic: 'Exodus' },
    { question: 'Where did Moses receive the Ten Commandments?', options: ['Mount Sinai', 'Mount Zion', 'Mount Carmel', 'Mount Ararat'], answer: 'Mount Sinai', difficulty: 1, topic: 'Exodus' },
    { question: 'Who was Moses\' brother?', options: ['Aaron', 'Joshua', 'Caleb', 'Joseph'], answer: 'Aaron', difficulty: 1, topic: 'Exodus' },
    { question: 'Who led the Israelites out of Egypt?', options: ['Moses', 'Aaron', 'Joshua', 'Caleb'], answer: 'Moses', difficulty: 1, topic: 'Exodus' },
    { question: 'What did Moses part to escape the Egyptians?', options: ['Red Sea', 'Jordan River', 'Nile River', 'Dead Sea'], answer: 'Red Sea', difficulty: 1, topic: 'Exodus' },
    { question: 'What did God provide the Israelites to eat in the desert?', options: ['Manna', 'Bread', 'Quail', 'Fish'], answer: 'Manna', difficulty: 2, topic: 'Exodus' },
    { question: 'Who succeeded Moses as the leader of the Israelites?', options: ['Joshua', 'Aaron', 'Caleb', 'David'], answer: 'Joshua', difficulty: 2, topic: 'Exodus' },
    { question: 'What was the first plague of Egypt?', options: ['Water turned into blood', 'Frogs', 'Locusts', 'Darkness'], answer: 'Water turned into blood', difficulty: 2, topic: 'Exodus' },
    // Kings of Israel topic
    { question: 'Who was the first king of Israel?', options: ['Saul', 'David', 'Solomon', 'Samuel'], answer: 'Saul', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who was the second king of Israel?', options: ['David', 'Saul', 'Solomon', 'Rehoboam'], answer: 'David', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who was known for his wisdom?', options: ['Solomon', 'David', 'Saul', 'Samuel'], answer: 'Solomon', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who built the temple in Jerusalem?', options: ['Solomon', 'David', 'Saul', 'Rehoboam'], answer: 'Solomon', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who was the king after David?', options: ['Solomon', 'Saul', 'Rehoboam', 'Jeroboam'], answer: 'Solomon', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who was the king known for his disobedience?', options: ['Saul', 'David', 'Solomon', 'Ahab'], answer: 'Saul', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who was the king during the division of Israel?', options: ['Rehoboam', 'Solomon', 'Saul', 'David'], answer: 'Rehoboam', difficulty: 2, topic: 'Kings of Israel' },
    { question: 'Who was the king known for his idolatry?', options: ['Ahab', 'Saul', 'David', 'Solomon'], answer: 'Ahab', difficulty: 2, topic: 'Kings of Israel' },
    // Miracles of Jesus topic
    { question: 'What was Jesus\' first miracle?', options: ['Turning water into wine', 'Feeding the 5000', 'Walking on water', 'Healing the blind man'], answer: 'Turning water into wine', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'Who was raised from the dead by Jesus?', options: ['Lazarus', 'Peter', 'Paul', 'John'], answer: 'Lazarus', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'How many people did Jesus feed with five loaves and two fish?', options: ['5000', '4000', '3000', '2000'], answer: '5000', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'What miracle did Jesus perform at the wedding at Cana?', options: ['Turning water into wine', 'Feeding the 5000', 'Walking on water', 'Healing the blind man'], answer: 'Turning water into wine', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'What did Jesus do to the stormy sea?', options: ['Calmed it', 'Parted it', 'Walked on it', 'Turned it to wine'], answer: 'Calmed it', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'Who did Jesus heal on the Sabbath?', options: ['Man with a withered hand', 'Lazarus', 'Blind Bartimaeus', 'Centurion\'s servant'], answer: 'Man with a withered hand', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'What did Jesus do for the centurion\'s servant?', options: ['Healed him', 'Raised him from the dead', 'Fed him', 'Taught him'], answer: 'Healed him', difficulty: 2, topic: 'Miracles of Jesus' },
    { question: 'Who did Jesus restore sight to?', options: ['Blind Bartimaeus', 'Lazarus', 'Centurion\'s servant', 'Jairus\' daughter'], answer: 'Blind Bartimaeus', difficulty: 2, topic: 'Miracles of Jesus' },
    // Parables of Jesus topic
    { question: 'What is the parable of the prodigal son about?', options: ['Forgiveness', 'Faith', 'Prayer', 'Judgment'], answer: 'Forgiveness', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the good Samaritan about?', options: ['Love your neighbor', 'Forgiveness', 'Faith', 'Prayer'], answer: 'Love your neighbor', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the sower about?', options: ['Word of God', 'Faith', 'Prayer', 'Judgment'], answer: 'Word of God', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the mustard seed about?', options: ['Kingdom of God', 'Faith', 'Prayer', 'Judgment'], answer: 'Kingdom of God', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the talents about?', options: ['Stewardship', 'Faith', 'Prayer', 'Judgment'], answer: 'Stewardship', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the lost sheep about?', options: ['God\'s love', 'Faith', 'Prayer', 'Judgment'], answer: 'God\'s love', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the rich fool about?', options: ['Greed', 'Faith', 'Prayer', 'Judgment'], answer: 'Greed', difficulty: 2, topic: 'Parables of Jesus' },
    { question: 'What is the parable of the wise and foolish builders about?', options: ['Obedience', 'Faith', 'Prayer', 'Judgment'], answer: 'Obedience', difficulty: 2, topic: 'Parables of Jesus' },
    // Apostles topic
    { question: 'Who was the first apostle?', options: ['Peter', 'John', 'James', 'Andrew'], answer: 'Peter', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle to the Gentiles?', options: ['Paul', 'Peter', 'John', 'James'], answer: 'Paul', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle that Jesus loved?', options: ['John', 'Peter', 'Paul', 'James'], answer: 'John', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle that denied Jesus?', options: ['Peter', 'John', 'Paul', 'James'], answer: 'Peter', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle that betrayed Jesus?', options: ['Judas Iscariot', 'Peter', 'John', 'Paul'], answer: 'Judas Iscariot', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle that wrote the Book of Revelation?', options: ['John', 'Peter', 'Paul', 'James'], answer: 'John', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle that was a tax collector?', options: ['Matthew', 'Peter', 'John', 'Paul'], answer: 'Matthew', difficulty: 2, topic: 'Apostles' },
    { question: 'Who was the apostle that doubted Jesus\' resurrection?', options: ['Thomas', 'Peter', 'John', 'James'], answer: 'Thomas', difficulty: 2, topic: 'Apostles' },
    // End Times topic
    { question: 'What is the last book of the New Testament?', options: ['Revelation', 'Jude', '3 John', '2 John'], answer: 'Revelation', difficulty: 2, topic: 'End Times' },
    { question: 'Who wrote the Book of Revelation?', options: ['John', 'Peter', 'Paul', 'James'], answer: 'John', difficulty: 2, topic: 'End Times' },
    { question: 'What is the Battle of Armageddon?', options: ['Final battle between good and evil', 'Jesus\' resurrection', 'Jesus\' crucifixion', 'Moses parting the Red Sea'], answer: 'Final battle between good and evil', difficulty: 2, topic: 'End Times' },
    { question: 'What is the New Jerusalem?', options: ['Heavenly city', 'Earthly city', 'City of David', 'City of Solomon'], answer: 'Heavenly city', difficulty: 2, topic: 'End Times' },
    { question: 'Who will be judged at the Great White Throne?', options: ['The dead', 'The living', 'The angels', 'The apostles'], answer: 'The dead', difficulty: 2, topic: 'End Times' },
    { question: 'Who will reign during the Millennium?', options: ['Christ', 'Moses', 'Elijah', 'Peter'], answer: 'Christ', difficulty: 2, topic: 'End Times' },
    { question: 'What are the seven seals?', options: ['Judgments of God', 'Apostles of Jesus', 'Books of the Bible', 'Miracles of Jesus'], answer: 'Judgments of God', difficulty: 2, topic: 'End Times' },
    { question: 'Who is the antichrist?', options: ['False messiah', 'Peter', 'John', 'Paul'], answer: 'False messiah', difficulty: 2, topic: 'End Times' },
    // Bible Characters topic
    { question: 'Who was the strongest man in the Bible?', options: ['Samson', 'David', 'Solomon', 'Abraham'], answer: 'Samson', difficulty: 3, topic: 'Bible Characters' },
    { question: 'Who was the wisest man in the Bible?', options: ['Solomon', 'David', 'Moses', 'Abraham'], answer: 'Solomon', difficulty: 2, topic: 'Bible Characters' },
    { question: 'Who was the father of many nations?', options: ['Abraham', 'Isaac', 'Jacob', 'Joseph'], answer: 'Abraham', difficulty: 1, topic: 'Bible Characters' },
    { question: 'Who was the mother of Jesus?', options: ['Mary', 'Martha', 'Elizabeth', 'Sarah'], answer: 'Mary', difficulty: 1, topic: 'Bible Characters' },
    { question: 'Who betrayed Jesus?', options: ['Judas Iscariot', 'Peter', 'John', 'Thomas'], answer: 'Judas Iscariot', difficulty: 1, topic: 'Bible Characters' },
    { question: 'Who denied Jesus three times?', options: ['Peter', 'Judas', 'John', 'Thomas'], answer: 'Peter', difficulty: 1, topic: 'Bible Characters' },
    { question: 'Who was the first man?', options: ['Adam', 'Noah', 'Abraham', 'David'], answer: 'Adam', difficulty: 1, topic: 'Bible Characters' },
    { question: 'Who was the first woman?', options: ['Eve', 'Sarah', 'Rebekah', 'Rachel'], answer: 'Eve', difficulty: 1, topic: 'Bible Characters' },
  ];

  getTopics(): string[] {
    return [...new Set(this.questions.map(q => q.topic))];
  }

  getQuestionsByTopic(topic: string): Observable<Question[]> {
    return of(this.questions.filter(q => q.topic === topic)).pipe(
      map((questions: Question[]) => this.shuffleAndSelectQuestions(questions))
    );
  }

  getProgressByTopic(topic: string): number {
    if (typeof localStorage !== 'undefined') {
      const progress = localStorage.getItem(`progress_${topic}`);
      console.log(`Retrieved progress for ${topic}:`, progress);
      return progress ? parseInt(progress, 10) : 0;
    }
    return 0;
  }

  saveProgress(topic: string, score: number, totalQuestions: number): void {
    if (typeof localStorage !== 'undefined') {
      const progress = Math.round((score / totalQuestions) * 100);
      localStorage.setItem(`progress_${topic}`, progress.toString());
      console.log(`Saved progress for ${topic}:`, progress);
    }
  }

  private shuffleAndSelectQuestions(questions: Question[]): Question[] {
    const shuffledQuestions = this.shuffle(questions);
    const selectedQuestions = shuffledQuestions.slice(0, 15);
    return selectedQuestions.sort((a, b) => a.difficulty - b.difficulty);
  }

  private shuffle(array: Question[]): Question[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
