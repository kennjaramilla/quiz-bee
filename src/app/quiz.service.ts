import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questions: Question[] = [
    { question: 'Who built the ark?', options: ['Noah', 'Moses', 'Abraham', 'David'], answer: 'Noah', difficulty: 1 },
    { question: 'Where was Jesus born?', options: ['Nazareth', 'Bethlehem', 'Jerusalem', 'Galilee'], answer: 'Bethlehem', difficulty: 1 },
    { question: 'Who received the Ten Commandments?', options: ['Moses', 'Aaron', 'Joshua', 'Joseph'], answer: 'Moses', difficulty: 1 },
    { question: 'Who was swallowed by a great fish?', options: ['Jonah', 'Daniel', 'Elijah', 'Elisha'], answer: 'Jonah', difficulty: 2 },
    { question: 'Who led the Israelites into the Promised Land?', options: ['Moses', 'Aaron', 'Joshua', 'Caleb'], answer: 'Joshua', difficulty: 2 },
    { question: 'Who was the first king of Israel?', options: ['Saul', 'David', 'Solomon', 'Samuel'], answer: 'Saul', difficulty: 2 },
    { question: 'Who was the strongest man in the Bible?', options: ['Samson', 'David', 'Solomon', 'Abraham'], answer: 'Samson', difficulty: 3 },
    { question: 'Who interpreted Pharaoh\'s dreams?', options: ['Joseph', 'Daniel', 'Moses', 'Aaron'], answer: 'Joseph', difficulty: 3 },
    { question: 'What is the longest book in the Bible?', options: ['Psalms', 'Isaiah', 'Genesis', 'Exodus'], answer: 'Psalms', difficulty: 3 },
    { question: 'Who was thrown into the lion\'s den?', options: ['Daniel', 'Joseph', 'David', 'Moses'], answer: 'Daniel', difficulty: 4 },
    { question: 'Who was the mother of Jesus?', options: ['Mary', 'Martha', 'Elizabeth', 'Sarah'], answer: 'Mary', difficulty: 1 },
    { question: 'Who betrayed Jesus?', options: ['Judas Iscariot', 'Peter', 'John', 'Thomas'], answer: 'Judas Iscariot', difficulty: 1 },
    { question: 'Who was the wisest man in the Bible?', options: ['Solomon', 'David', 'Moses', 'Abraham'], answer: 'Solomon', difficulty: 2 },
    { question: 'Who was thrown into a fiery furnace?', options: ['Shadrach, Meshach, and Abednego', 'Daniel', 'David', 'Solomon'], answer: 'Shadrach, Meshach, and Abednego', difficulty: 3 },
    { question: 'Who was the giant killed by David?', options: ['Goliath', 'Samson', 'Saul', 'Absalom'], answer: 'Goliath', difficulty: 1 },
    { question: 'Who was the first murderer?', options: ['Cain', 'Abel', 'Lamech', 'Esau'], answer: 'Cain', difficulty: 1 },
    { question: 'Who was the father of many nations?', options: ['Abraham', 'Isaac', 'Jacob', 'Joseph'], answer: 'Abraham', difficulty: 1 },
    { question: 'Who was the tax collector that climbed a tree to see Jesus?', options: ['Zacchaeus', 'Matthew', 'Peter', 'James'], answer: 'Zacchaeus', difficulty: 2 },
    { question: 'Who was the prophet swallowed by a fish?', options: ['Jonah', 'Isaiah', 'Ezekiel', 'Daniel'], answer: 'Jonah', difficulty: 1 },
    { question: 'Who was the first person to see Jesus after His resurrection?', options: ['Mary Magdalene', 'Peter', 'John', 'Thomas'], answer: 'Mary Magdalene', difficulty: 2 },
    { question: 'Who wrote the majority of the New Testament?', options: ['Paul', 'Peter', 'John', 'Luke'], answer: 'Paul', difficulty: 1 },
    { question: 'Who was the brother of Moses?', options: ['Aaron', 'Joshua', 'Caleb', 'Joseph'], answer: 'Aaron', difficulty: 1 },
    { question: 'What is the shortest book in the New Testament?', options: ['2 John', '3 John', 'Philemon', 'Jude'], answer: '2 John', difficulty: 3 },
    { question: 'Who was the first disciple to be martyred?', options: ['James', 'Peter', 'John', 'Andrew'], answer: 'James', difficulty: 2 },
    { question: 'Who was the wife of Abraham?', options: ['Sarah', 'Rebekah', 'Rachel', 'Leah'], answer: 'Sarah', difficulty: 1 },
    { question: 'What was the first miracle Jesus performed?', options: ['Turning water into wine', 'Feeding the 5000', 'Walking on water', 'Healing the blind man'], answer: 'Turning water into wine', difficulty: 1 },
    { question: 'Who was the father of John the Baptist?', options: ['Zechariah', 'Joseph', 'Simeon', 'Nicodemus'], answer: 'Zechariah', difficulty: 1 },
    { question: 'Who denied Jesus three times?', options: ['Peter', 'Judas', 'John', 'Thomas'], answer: 'Peter', difficulty: 1 },
    { question: 'Who was the Roman governor who sentenced Jesus to death?', options: ['Pontius Pilate', 'Herod', 'Caesar', 'Felix'], answer: 'Pontius Pilate', difficulty: 2 },
    { question: 'Who was the disciple known as "The Rock"?', options: ['Peter', 'Paul', 'John', 'James'], answer: 'Peter', difficulty: 1 },
    { question: 'Who was the mother of Samuel?', options: ['Hannah', 'Sarah', 'Rebekah', 'Rachel'], answer: 'Hannah', difficulty: 2 },
    { question: 'Who was the man after God\'s own heart?', options: ['David', 'Abraham', 'Moses', 'Noah'], answer: 'David', difficulty: 1 },
    { question: 'Who was the king of Israel known for his wisdom?', options: ['Solomon', 'David', 'Saul', 'Rehoboam'], answer: 'Solomon', difficulty: 2 },
    { question: 'Who was the first man created by God?', options: ['Adam', 'Noah', 'Abraham', 'Isaac'], answer: 'Adam', difficulty: 1 },
    { question: 'Who was the woman turned into a pillar of salt?', options: ['Lot\'s wife', 'Sarah', 'Rebekah', 'Rachel'], answer: 'Lot\'s wife', difficulty: 2 },
    { question: 'Who was the prophet who confronted King Ahab?', options: ['Elijah', 'Elisha', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3 },
    { question: 'Who was the first woman?', options: ['Eve', 'Sarah', 'Rebekah', 'Rachel'], answer: 'Eve', difficulty: 1 },
    { question: 'Who was the prophet taken up to heaven in a whirlwind?', options: ['Elijah', 'Enoch', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3 },
    { question: 'Who was the woman judge of Israel?', options: ['Deborah', 'Hannah', 'Esther', 'Ruth'], answer: 'Deborah', difficulty: 3 },
    { question: 'Who was the king who built the temple in Jerusalem?', options: ['Solomon', 'David', 'Saul', 'Rehoboam'], answer: 'Solomon', difficulty: 2 },
    { question: 'Who was the prophet who anointed David as king?', options: ['Samuel', 'Nathan', 'Elijah', 'Elisha'], answer: 'Samuel', difficulty: 2 },
    { question: 'Who was the man who lived in the belly of a great fish for three days?', options: ['Jonah', 'Daniel', 'Elijah', 'Elisha'], answer: 'Jonah', difficulty: 2 },
    { question: 'Who was the Roman centurion who recognized Jesus as the Son of God at the crucifixion?', options: ['Centurion at the cross', 'Cornelius', 'Felix', 'Herod'], answer: 'Centurion at the cross', difficulty: 3 },
    { question: 'Who was the prophet who had a vision of a valley of dry bones?', options: ['Ezekiel', 'Isaiah', 'Jeremiah', 'Daniel'], answer: 'Ezekiel', difficulty: 3 },
    { question: 'Who was the king of Babylon who saw the writing on the wall?', options: ['Belshazzar', 'Nebuchadnezzar', 'Darius', 'Cyrus'], answer: 'Belshazzar', difficulty: 3 },
    { question: 'Who was the queen who saved her people from destruction?', options: ['Esther', 'Ruth', 'Deborah', 'Hannah'], answer: 'Esther', difficulty: 3 },
    { question: 'Who was the prophet who challenged the prophets of Baal on Mount Carmel?', options: ['Elijah', 'Elisha', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3 },
    { question: 'Who was the man who wrestled with an angel and had his name changed to Israel?', options: ['Jacob', 'Isaac', 'Abraham', 'Joseph'], answer: 'Jacob', difficulty: 2 },
    { question: 'Who was the first high priest of Israel?', options: ['Aaron', 'Moses', 'Joshua', 'Caleb'], answer: 'Aaron', difficulty: 2 },
    { question: 'Who was the prophet who foretold the coming of the Messiah?', options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'], answer: 'Isaiah', difficulty: 3 },
    { question: 'Who was the man who built the first altar to God?', options: ['Noah', 'Abel', 'Enoch', 'Seth'], answer: 'Noah', difficulty: 3 },
    { question: 'Who was the prophet who was taken up to heaven in a chariot of fire?', options: ['Elijah', 'Enoch', 'Isaiah', 'Jeremiah'], answer: 'Elijah', difficulty: 3 },
    { question: 'Who was the disciple who walked on water with Jesus?', options: ['Peter', 'John', 'James', 'Andrew'], answer: 'Peter', difficulty: 2 },
    { question: 'Who was the man who wrote the book of Revelation?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 2 },
    { question: 'Who was the man who betrayed Jesus with a kiss?', options: ['Judas Iscariot', 'Peter', 'John', 'Thomas'], answer: 'Judas Iscariot', difficulty: 1 },
    { question: 'Who was the first martyr of the Christian church?', options: ['Stephen', 'Peter', 'John', 'James'], answer: 'Stephen', difficulty: 2 },
    { question: 'Who was the man who denied Jesus three times before the rooster crowed?', options: ['Peter', 'John', 'James', 'Andrew'], answer: 'Peter', difficulty: 1 },
    { question: 'Who was the man who was stoned to death for preaching about Jesus?', options: ['Stephen', 'Peter', 'John', 'James'], answer: 'Stephen', difficulty: 3 },
    { question: 'Who was the man who saw a vision of Jesus on the road to Damascus?', options: ['Paul', 'Peter', 'John', 'James'], answer: 'Paul', difficulty: 2 },
    { question: 'Who was the man who baptized Jesus?', options: ['John the Baptist', 'Peter', 'Paul', 'James'], answer: 'John the Baptist', difficulty: 1 },
    { question: 'Who was the disciple known as the "beloved disciple"?', options: ['John', 'Peter', 'Paul', 'James'], answer: 'John', difficulty: 2 },
    { question: 'Who was the man who had a coat of many colors?', options: ['Joseph', 'Moses', 'David', 'Solomon'], answer: 'Joseph', difficulty: 2 },
    { question: 'Who was the king who had a dream about a great statue?', options: ['Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus'], answer: 'Nebuchadnezzar', difficulty: 3 },
    { question: 'Who was the man who was thrown into a den of lions?', options: ['Daniel', 'Joseph', 'David', 'Moses'], answer: 'Daniel', difficulty: 3 },
    { question: 'Who was the man who built the temple in Jerusalem?', options: ['Solomon', 'David', 'Saul', 'Rehoboam'], answer: 'Solomon', difficulty: 2 },
    { question: 'Who was the man who saw a vision of a great tree that was cut down?', options: ['Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus'], answer: 'Nebuchadnezzar', difficulty: 3 },
    { question: 'Who was the man who was swallowed by a great fish?', options: ['Jonah', 'Daniel', 'Elijah', 'Elisha'], answer: 'Jonah', difficulty: 1 },
    { question: 'Who was the man who wrote many of the Psalms?', options: ['David', 'Solomon', 'Moses', 'Aaron'], answer: 'David', difficulty: 1 },
    { question: 'Who was the man who built an ark?', options: ['Noah', 'Moses', 'Abraham', 'David'], answer: 'Noah', difficulty: 1 },
    { question: 'Who was the man who received the Ten Commandments?', options: ['Moses', 'Aaron', 'Joshua', 'Joseph'], answer: 'Moses', difficulty: 1 },
    { question: 'Who was the man who killed a giant with a sling and a stone?', options: ['David', 'Samson', 'Saul', 'Absalom'], answer: 'David', difficulty: 1 },
    { question: 'Who was the man who had a dream about a ladder reaching to heaven?', options: ['Jacob', 'Isaac', 'Abraham', 'Joseph'], answer: 'Jacob', difficulty: 3 },
    { question: 'Who was the man who was sold into slavery by his brothers?', options: ['Joseph', 'Moses', 'David', 'Solomon'], answer: 'Joseph', difficulty: 2 },
    { question: 'Who was the man who interpreted Pharaoh\'s dreams?', options: ['Joseph', 'Daniel', 'Moses', 'Aaron'], answer: 'Joseph', difficulty: 2 },
    { question: 'Who was the man who saw a vision of dry bones coming to life?', options: ['Ezekiel', 'Isaiah', 'Jeremiah', 'Daniel'], answer: 'Ezekiel', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a great statue?', options: ['Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus'], answer: 'Nebuchadnezzar', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a lion with eagle\'s wings?', options: ['Daniel', 'Ezekiel', 'Isaiah', 'Jeremiah'], answer: 'Daniel', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a ram and a goat?', options: ['Daniel', 'Ezekiel', 'Isaiah', 'Jeremiah'], answer: 'Daniel', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a woman clothed with the sun?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a new heaven and a new earth?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a great white throne?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a river of life?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a tree of life?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of a new Jerusalem?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of the seven churches?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of the seven seals?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of the seven trumpets?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 },
    { question: 'Who was the man who saw a vision of the seven bowls?', options: ['John', 'Paul', 'Peter', 'James'], answer: 'John', difficulty: 3 }
  ];

  getQuestions(): Observable<Question[]> {
    return of(this.questions).pipe(
      map((questions: Question[]) => this.shuffleAndSelectQuestions(questions))
    );
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
