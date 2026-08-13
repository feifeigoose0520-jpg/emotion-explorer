emotion_scores = {"joy": 0,"trust": 0,"fear": 0,"surprise": 0,
                  "sadness": 0,"disgust": 0,"anger": 0,"anticipation": 0}

intensity_scores = {}


question_1 = {"question": "Which of these feels closest to what you're reacting to right now?",
            "max_choices": 2,
            "answers": [
                {"choice": "Something feels good or rewarding",
                "scores": {"joy": 1}},
                {"choice": "Someone or something feels safe, supportive, or dependable",
                "scores": {"trust": 1}},
                {"choice": "Something feels threatening, unsafe, or risky",
                "scores": {"fear": 1}},
                {"choice": "Something unexpected happened or changed suddenly",
                "scores": {"surprise": 1}},
                {"choice": "Something important feels lost, missing, or disappointing",
                "scores": {"sadness": 1}},
                {"choice": "Something feels unpleasant, wrong, or hard to tolerate",
                "scores": {"disgust": 1}},
                {"choice": "Something feels unfair, frustrating, or in my way",
                "scores": {"anger": 1}},
                {"choice": "I'm focused on something that may happen next",
                "scores": {"anticipation": 1}},
                {"choice": "I'm not sure",
                "scores":{}}
                ]
            }


question_2 = {"question": "Without judging the reaction, what do you feel most like doing right now?",
            "max_choices": 2,
            "answers": [
                {"choice": "Stay with this feeling or enjoy what's happening",
                "scores": {"joy": 1}},
                {"choice": "Move closer, connect, share, or rely on someone",
                "scores": {"trust": 1}},
                {"choice": "Get away, hide, protect myself, or avoid something",
                "scores": {"fear": 1}},
                {"choice": "Stop and figure out what just happened",
                "scores": {"surprise": 1}},
                {"choice": "Withdraw, be alone, cry, or slow down",
                "scores": {"sadness": 1}},
                {"choice": "Push something away or create distance from it",
                "scores": {"disgust": 1}},
                {"choice": "Push back, confront, argue, or change something",
                "scores": {"anger": 1}},
                {"choice": "Prepare, check, plan, or see what happens next",
                "scores": {"anticipation": 1}},
                {"choice": "I don't know",
                "scores": {}}
                ]
            }


question_3 = {"question": "Which physical experience feels closest to what you're noticing right now?",
            "max_choices": 2,
            "answers": [
                {"choice": "Light, warm, energized, or open",
                "scores": {"joy": 1}},
                {"choice": "Calm, settled, comfortable, or open toward others",
                "scores": {"trust": 1}},
                {"choice": "Tight, shaky, alert, tense, or heart racing",
                "scores": {"fear": 1}},
                {"choice": "Startled, frozen for a moment, or suddenly alert",
                "scores": {"surprise": 1}},
                {"choice": "Heavy, drained, low-energy, or close to tears",
                "scores": {"sadness": 1}},
                {"choice": "Nauseated, uncomfortable, or wanting to turn away",
                "scores": {"disgust": 1}},
                {"choice": "Hot, tense, clenched, restless, or ready to act",
                "scores": {"anger": 1}},
                {"choice": "Alert, restless, energized, or leaning toward what's next",
                "scores": {"anticipation": 1}},
                {"choice": "I can't tell",
                "scores": {}}
                ]
            }


question_4 = {"question": "Which thought feels closest to what keeps going through your mind right now?",
            "max_choices": 2,
            "answers": [
            {"choice": "I want this to continue",
            "scores": {"joy": 1}},
            {"choice": "I feel comfortable relying on this person or situation",
            "scores": {"trust": 1}},
            {"choice": "What if something goes wrong?",
            "scores": {"fear": 1}},
            {"choice": "What just happened? I didn't expect that",
            "scores": {"surprise": 1}},
            {"choice": "I wish this hadn't happened, or I miss what was there",
            "scores": {"sadness": 1}},
            {"choice": "I really don't want this near me",
            "scores": {"disgust": 1}},
            {"choice": "This shouldn't be happening, or this isn't okay",
            "scores": {"anger": 1}},
            {"choice": "What's going to happen next?",
            "scores": {"anticipation": 1}},
            {"choice": "None of these",
            "scores": {}}
            ]
        }


question_5 = {"question": "What does your attention keep returning to right now?",
            "max_choices": 2,
            "answers": [
            {"choice": "Something enjoyable, exciting, or rewarding",
            "scores": {"joy": 1}},
            {"choice": "A person or relationship that feels meaningful or safe",
            "scores": {"trust": 1}},
            {"choice": "Possible danger, failure, or something going wrong",
            "scores": {"fear": 1}},
            {"choice": "Something unusual or unexpected",
            "scores": {"surprise": 1}},
            {"choice": "Something I lost, miss, regret, or wish were different",
            "scores": {"sadness": 1}},
            {"choice": "Something that feels disturbing, unpleasant, or unacceptable",
            "scores": {"disgust": 1}},
            {"choice": "A problem, obstacle, conflict, or unfair situation",
            "scores": {"anger": 1}},
            {"choice": "A future event, possibility, decision, or uncertainty",
            "scores": {"anticipation": 1}},
            {"choice": "My attention is everywhere, or I don't know",
            "scores": {}}
            ]
        }


question_6 = {"question": "Which change would bring you the most relief right now?",
            "max_choices": 2,
            "answers": [
            {"choice": "Being able to enjoy or continue something good",
            "scores": {"joy": 1}},
            {"choice": "Knowing I can trust or rely on someone",
            "scores": {"trust": 1}},
            {"choice": "Knowing that I'm safe",
            "scores": {"fear": 1}},
            {"choice": "Understanding what just happened",
            "scores": {"surprise": 1}},
            {"choice": "Getting back something I lost, or making peace with the loss",
            "scores": {"sadness": 1}},
            {"choice": "Getting away from or removing something deeply unpleasant",
            "scores": {"disgust": 1}},
            {"choice": "Removing an obstacle or resolving something unfair",
            "scores": {"anger": 1}},
            {"choice": "Knowing what will happen or having a clear plan",
            "scores": {"anticipation": 1}},
            {"choice": "I don't know what would help",
            "scores": {}}
            ]
        }


question_7 = {"question": "After thinking through the previous questions, which words feel closest to what you're experiencing right now?",
            "max_choices": 2,
            "answers": [
            {"choice": "Joy",
            "scores": {"joy": 2}},
            {"choice": "Trust",
            "scores": {"trust": 2}},
            {"choice": "Fear",
            "scores": {"fear": 2}},
            {"choice": "Surprise",
            "scores": {"surprise": 2}},
            {"choice": "Sadness",
            "scores": {"sadness": 2}},
            {"choice": "Disgust",
            "scores": {"disgust": 2}},
            {"choice": "Anger",
            "scores": {"anger": 2}},
            {"choice": "Anticipation",
            "scores": {"anticipation": 2}},
            {"choice": "I'm still not sure",
            "scores": {}}
            ]
        }

fear_intensity_question = {"question": "How strongly do you feel the need to protect yourself, get away, or stay on alert right now?",
                        "answers": [
                        {"choice": "A little",
                        "score": 1},
                         {"choice": "Noticeably",
                        "score": 2},
                        {"choice": "Very strongly",
                        "score": 3}
                        ]
                    }

sadness_intensity_question = {"question": "How strongly do you feel pulled to slow down, withdraw, or stay with what has been lost or changed?",
                            "answers": [
                            {"choice": "A little",
                            "score": 1},
                            {"choice": "Noticeably",
                            "score": 2},
                            {"choice": "Very strongly",
                            "score": 3}
                            ]
                        }

anger_intensity_question = {"question": "How strongly do you feel pulled to push back, confront, or change what is happening?",
                        "answers": [
                        {"choice": "A little",
                        "score": 1},
                        {"choice": "Noticeably",
                        "score": 2},
                        {"choice": "Very strongly",
                        "score": 3}
                        ]
                    }

joy_intensity_question = {"question": "How strongly do you feel pulled to stay with, enjoy, or express what feels good right now?",
                        "answers": [
                        {"choice": "A little",
                        "score": 1},
                        {"choice": "Noticeably",
                        "score": 2},
                        {"choice": "Very strongly",
                        "score": 3}
                        ]
                    }


trust_intensity_question = {"question": "How strongly do you feel drawn to rely on, open up to, or feel secure with someone or something right now?",
                        "answers": [
                        {"choice": "A little",
                        "score": 1},
                        {"choice": "Noticeably",
                        "score": 2},
                        {"choice": "Very strongly",
                        "score": 3}
                        ]
                    }


surprise_intensity_question = {"question": "How strongly does what happened still feel unexpected or difficult to make sense of right now?",
                            "answers": [
                            {"choice": "A little",
                            "score": 1},
                            {"choice": "Noticeably",
                            "score": 2},
                            {"choice": "Very strongly",
                            "score": 3}
                            ]
                        }


disgust_intensity_question = {"question": "How strongly do you feel pulled to reject, avoid, or create distance from what feels unpleasant right now?",
                            "answers": [
                            {"choice": "A little",
                            "score": 1},
                            {"choice": "Noticeably",
                            "score": 2},
                            {"choice": "Very strongly",
                            "score": 3}
                            ]
                        }

anticipation_intensity_question = {"question": "How strongly do you feel pulled to prepare, plan, or keep thinking about what may happen next?",
                                "answers": [
                                {"choice": "A little",
                                "score": 1},
                                {"choice": "Noticeably",
                                "score": 2},
                                {"choice": "Very strongly",
                                "score": 3}
                                ]
                            }

intensity_labels = {"joy": {1: "serenity",
                            2: "joy",
                            3: "ecstasy"},
                    "trust": {1: "acceptance",
                              2: "trust",
                              3: "admiration"},
                    "fear": {1: "apprehension",
                             2: "fear",
                             3: "terror"},
                    "surprise": {1: "distraction",
                                 2: "surprise",
                                 3: "amazement"},
                    "sadness": {1: "pensiveness",
                                2: "sadness",
                                3: "grief"},
                    "disgust": {1: "boredom",
                                2: "disgust",
                                3: "loathing"},
                    "anger": {1: "annoyance",
                              2: "anger",
                              3: "rage"},
                    "anticipation": {1: "interest",
                                     2: "anticipation",
                                     3: "vigilance"}
                     }

def test(question):
    print(question["question"])
    index = 1
    for answer in question["answers"]:
        print(f"{index}. {answer['choice']}")
        index+=1    

    user_input = input("Choose up to 2 options, separated by commas: ")
    choices = user_input.split(",")
    num_choices = []

    for choice in choices:
        choice = choice.strip()
        if not choice.isdigit():
            print("Please enter numbers only.")
            return
        
        num_choices.append(int(choice))

    if len(num_choices) > question["max_choices"]:
        print("Please choose no more than 2 options.")
        return

    for choice in num_choices:
        if choice < 1 or choice > len(question["answers"]):
            print("Please enter a valid option number.")
            return

    for choice in num_choices:
        num_answer = question["answers"][choice-1]
        for emotion, score in num_answer["scores"].items():
            emotion_scores[emotion] += score

def calculate_emotion_scores():
    test(question_1)
    test(question_2)
    test(question_3)
    test(question_4)
    test(question_5)
    test(question_6)
    test(question_7)

    if all(score == 0 for score in emotion_scores.values()):
        return []

    highest_score = 0
    highest_emotion = []

    for emotion in emotion_scores:
        score = emotion_scores[emotion]
        if score > highest_score:
            highest_score = score
            highest_emotion = [emotion]
        elif score == highest_score:
            highest_emotion.append(emotion)

    if len(highest_emotion) < 2:
        second_highest_score = 0
        second_highest_emotion = []

        for emotion in emotion_scores:
            score = emotion_scores[emotion]
            if score < highest_score:
                if score > second_highest_score:
                    second_highest_score = score
                    second_highest_emotion = [emotion]
                elif score == second_highest_score:
                    second_highest_emotion.append(emotion)


    if len(highest_emotion) >= 2:
        final_emotions = highest_emotion
        return final_emotions
    else:
        final_emotions = highest_emotion + second_highest_emotion
        return final_emotions


final_emotions = calculate_emotion_scores()

def calculate_intensity_scores(emotion,intensity_question):
    print(intensity_question["question"])

    index = 1
    for answer in intensity_question["answers"]:
        print(f"{index}. {answer['choice']}")
        index += 1

    user_input = int(input("Choose one option: "))
    selected_answer = intensity_question["answers"][user_input - 1]
    intensity_scores[emotion] = selected_answer["score"]

def final_result():
    if len(final_emotions) == 0:
        print("\nThere isn't enough information to identify an emotion yet.")
        return

    if "fear" in final_emotions:
        calculate_intensity_scores("fear", fear_intensity_question)
    if "sadness" in final_emotions:
        calculate_intensity_scores("sadness", sadness_intensity_question)
    if "anger" in final_emotions:
        calculate_intensity_scores("anger", anger_intensity_question)
    if "joy" in final_emotions:
        calculate_intensity_scores("joy", joy_intensity_question)
    if "trust" in final_emotions:
        calculate_intensity_scores("trust", trust_intensity_question)
    if "surprise" in final_emotions:
        calculate_intensity_scores("surprise", surprise_intensity_question)
    if "disgust" in final_emotions:
        calculate_intensity_scores("disgust", disgust_intensity_question)
    if "anticipation" in final_emotions:
        calculate_intensity_scores("anticipation", anticipation_intensity_question)

    final = []

    for emotion in final_emotions:
        score = intensity_scores[emotion]
        label = intensity_labels[emotion][score]
        final.append(label)

    
    print("\nYour Emotional Landscape")
    print("------------------------")
    print(final)


final_result()