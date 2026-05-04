export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StateInfo {
  code: string;
  name: string;
  totalQuestions: number;
  passingScore: number;
}

export const states: StateInfo[] = [
  { code: 'CA', name: 'California', totalQuestions: 46, passingScore: 38 },
  { code: 'TX', name: 'Texas', totalQuestions: 30, passingScore: 21 },
  { code: 'FL', name: 'Florida', totalQuestions: 50, passingScore: 40 },
  { code: 'NY', name: 'New York', totalQuestions: 20, passingScore: 14 },
  { code: 'IL', name: 'Illinois', totalQuestions: 35, passingScore: 28 },
  { code: 'PA', name: 'Pennsylvania', totalQuestions: 18, passingScore: 15 },
  { code: 'OH', name: 'Ohio', totalQuestions: 40, passingScore: 30 },
  { code: 'GA', name: 'Georgia', totalQuestions: 20, passingScore: 15 },
  { code: 'NC', name: 'North Carolina', totalQuestions: 25, passingScore: 20 },
  { code: 'MI', name: 'Michigan', totalQuestions: 50, passingScore: 40 },
  { code: 'NJ', name: 'New Jersey', totalQuestions: 50, passingScore: 40 },
  { code: 'VA', name: 'Virginia', totalQuestions: 35, passingScore: 30 },
  { code: 'WA', name: 'Washington', totalQuestions: 40, passingScore: 32 },
  { code: 'AZ', name: 'Arizona', totalQuestions: 30, passingScore: 24 },
  { code: 'MA', name: 'Massachusetts', totalQuestions: 25, passingScore: 18 },
];

export const questions: Question[] = [
  // Road Signs
  {
    id: 'rs001',
    category: 'Road Signs',
    question: 'What does a red octagonal sign mean?',
    options: ['Yield', 'Stop', 'Speed limit', 'No parking'],
    correctAnswer: 1,
    explanation: 'A red octagonal sign is always a stop sign. You must come to a complete stop before the line and proceed only when safe.',
    difficulty: 'easy'
  },
  {
    id: 'rs002',
    category: 'Road Signs',
    question: 'A yellow diamond-shaped sign with a black X indicates:',
    options: ['Railroad crossing', 'Intersection ahead', 'No passing zone', 'School zone'],
    correctAnswer: 2,
    explanation: 'A yellow diamond with a black X is a no passing zone sign. It indicates that you cannot pass other vehicles in this area.',
    difficulty: 'medium'
  },
  {
    id: 'rs003',
    category: 'Road Signs',
    question: 'What does a white rectangular sign with black letters typically indicate?',
    options: ['Regulation', 'Warning', 'Guide', 'Construction'],
    correctAnswer: 0,
    explanation: 'White rectangular signs with black letters are regulatory signs that enforce traffic laws, such as speed limits or parking restrictions.',
    difficulty: 'easy'
  },
  {
    id: 'rs004',
    category: 'Road Signs',
    question: 'A green rectangular sign provides:',
    options: ['Warning information', 'Regulatory information', 'Guide/directional information', 'Construction information'],
    correctAnswer: 2,
    explanation: 'Green rectangular signs are guide signs that provide directional information, such as highway numbers and distances to destinations.',
    difficulty: 'easy'
  },
  {
    id: 'rs005',
    category: 'Road Signs',
    question: 'What does an orange sign indicate?',
    options: ['School zone', 'Construction zone', 'Hospital zone', 'Railroad crossing'],
    correctAnswer: 1,
    explanation: 'Orange signs are used in construction zones to warn drivers of road work, detours, and temporary traffic patterns.',
    difficulty: 'medium'
  },
  {
    id: 'rs006',
    category: 'Road Signs',
    question: 'A pentagon-shaped sign indicates:',
    options: ['School zone', 'Railroad crossing', 'No passing zone', 'Yield'],
    correctAnswer: 0,
    explanation: 'A pentagon-shaped sign (point up) indicates a school zone or school crossing. Be prepared for children and reduced speed limits.',
    difficulty: 'medium'
  },
  {
    id: 'rs007',
    category: 'Road Signs',
    question: 'What does a circular sign mean?',
    options: ['Railroad crossing', 'Stop', 'Yield', 'Regulation'],
    correctAnswer: 0,
    explanation: 'Circular signs are used for railroad crossings. The X-shaped railroad crossing sign is a variation of this shape.',
    difficulty: 'easy'
  },
  {
    id: 'rs008',
    category: 'Road Signs',
    question: 'A sign with a red circle and white center means:',
    options: ['Stop', 'Yield', 'Do not enter', 'Speed limit'],
    correctAnswer: 2,
    explanation: 'A red circle with a white horizontal bar means "Do Not Enter." You must not proceed in that direction.',
    difficulty: 'easy'
  },
  {
    id: 'rs009',
    category: 'Road Signs',
    question: 'What does a broken yellow line indicate?',
    options: ['No passing', 'Passing allowed', 'Two-way traffic', 'Center lane'],
    correctAnswer: 1,
    explanation: 'A broken yellow line indicates that passing is allowed when safe. You can cross this line to pass other vehicles.',
    difficulty: 'medium'
  },
  {
    id: 'rs010',
    category: 'Road Signs',
    question: 'A solid white line on the right edge of the roadway means:',
    options: ['No passing zone', 'Edge of pavement', 'Center line', 'Bike lane'],
    correctAnswer: 1,
    explanation: 'A solid white line on the right edge indicates the edge of the pavement. Do not drive to the right of this line.',
    difficulty: 'easy'
  },
  {
    id: 'rs011',
    category: 'Road Signs',
    question: 'What does a blue sign indicate?',
    options: ['Regulation', 'Warning', 'Motorist services', 'Construction'],
    correctAnswer: 2,
    explanation: 'Blue signs indicate motorist services such as rest areas, gas stations, hospitals, and lodging.',
    difficulty: 'medium'
  },
  {
    id: 'rs012',
    category: 'Road Signs',
    question: 'A sign shaped like an upside-down triangle means:',
    options: ['Stop', 'Yield', 'Railroad crossing', 'School zone'],
    correctAnswer: 1,
    explanation: 'An upside-down triangle is always a yield sign. You must slow down and yield the right-of-way to traffic on the intersecting road.',
    difficulty: 'easy'
  },
  {
    id: 'rs013',
    category: 'Road Signs',
    question: 'What does a rectangular sign with a black arrow indicate?',
    options: ['Turn prohibition', 'Mandatory turn', 'Direction guidance', 'Lane ending'],
    correctAnswer: 2,
    explanation: 'Rectangular signs with arrows provide directional guidance, showing which way to go or which lane to use.',
    difficulty: 'easy'
  },
  {
    id: 'rs014',
    category: 'Road Signs',
    question: 'A sign showing a person crossing indicates:',
    options: ['School zone', 'Pedestrian crossing', 'Construction zone', 'Playground'],
    correctAnswer: 1,
    explanation: 'A sign showing a person crossing indicates a pedestrian crossing. Be prepared to stop for pedestrians.',
    difficulty: 'easy'
  },
  {
    id: 'rs015',
    category: 'Road Signs',
    question: 'What does a sign with a red triangle mean?',
    options: ['Yield', 'Stop', 'Warning', 'Construction'],
    correctAnswer: 0,
    explanation: 'A red triangle pointing downward is a yield sign. You must slow down and yield to other traffic.',
    difficulty: 'easy'
  },
  {
    id: 'rs016',
    category: 'Road Signs',
    question: 'A sign showing a deer indicates:',
    options: ['Hunting area', 'Wildlife crossing', 'Park entrance', 'Forest service road'],
    correctAnswer: 1,
    explanation: 'A deer sign indicates a wildlife crossing area. Be alert for animals that may cross the road.',
    difficulty: 'medium'
  },
  {
    id: 'rs017',
    category: 'Road Signs',
    question: 'What does a sign with a bicycle symbol indicate?',
    options: ['Bike lane', 'No bicycles', 'Bike crossing', 'Bike route'],
    correctAnswer: 0,
    explanation: 'A bicycle symbol indicates a bike lane. Motor vehicles should not drive in bike lanes unless making turns.',
    difficulty: 'easy'
  },
  {
    id: 'rs018',
    category: 'Road Signs',
    question: 'A sign showing a truck on a hill indicates:',
    options: ['Truck stop', 'Steep grade', 'Truck route', 'No trucks'],
    correctAnswer: 1,
    explanation: 'A sign showing a truck on a hill indicates a steep grade ahead. Trucks should use lower gears to maintain control.',
    difficulty: 'medium'
  },
  {
    id: 'rs019',
    category: 'Road Signs',
    question: 'What does a sign with a flag symbol indicate?',
    options: ['School zone', 'Construction zone', 'Historical site', 'Government building'],
    correctAnswer: 1,
    explanation: 'A flag symbol on an orange sign indicates a construction zone flagger ahead who may be controlling traffic.',
    difficulty: 'medium'
  },
  {
    id: 'rs020',
    category: 'Road Signs',
    question: 'A sign showing a snowflake indicates:',
    options: ['Winter conditions', 'Ice on bridge', 'Snow removal route', 'Cold weather warning'],
    correctAnswer: 1,
    explanation: 'A snowflake sign indicates that the bridge freezes before the road surface. Use caution in cold weather.',
    difficulty: 'medium'
  },
  // Traffic Laws
  {
    id: 'tl001',
    category: 'Traffic Laws',
    question: 'When must you use your turn signals?',
    options: ['Only at night', 'Only in heavy traffic', 'When turning or changing lanes', 'Only on highways'],
    correctAnswer: 2,
    explanation: 'You must use turn signals when turning, changing lanes, pulling away from curb, or stopping at roadside. Signal at least 100 feet before turning.',
    difficulty: 'easy'
  },
  {
    id: 'tl002',
    category: 'Traffic Laws',
    question: 'What is the speed limit in residential areas unless otherwise posted?',
    options: ['15 mph', '25 mph', '35 mph', '45 mph'],
    correctAnswer: 1,
    explanation: 'The default speed limit in residential areas is 25 mph unless otherwise posted. Always drive at a safe speed for conditions.',
    difficulty: 'easy'
  },
  {
    id: 'tl003',
    category: 'Traffic Laws',
    question: 'When may you legally pass on the right?',
    options: ['Never', 'Only on highways', 'When the vehicle ahead is turning left', 'Only in emergencies'],
    correctAnswer: 2,
    explanation: 'You may pass on the right when the vehicle ahead is making a left turn, or on a multi-lane highway with clear traffic.',
    difficulty: 'medium'
  },
  {
    id: 'tl004',
    category: 'Traffic Laws',
    question: 'What should you do at a flashing red light?',
    options: ['Proceed with caution', 'Stop, then proceed when safe', 'Speed up', 'Turn around'],
    correctAnswer: 1,
    explanation: 'A flashing red light means the same as a stop sign. Come to a complete stop, then proceed when safe.',
    difficulty: 'easy'
  },
  {
    id: 'tl005',
    category: 'Traffic Laws',
    question: 'When must you yield to pedestrians?',
    options: ['Only at crosswalks', 'Only when they have the walk signal', 'Always in marked crosswalks', 'Only at intersections'],
    correctAnswer: 2,
    explanation: 'You must yield to pedestrians in marked crosswalks, whether or not they have the walk signal. Always be prepared to stop.',
    difficulty: 'medium'
  },
  {
    id: 'tl006',
    category: 'Traffic Laws',
    question: 'What is the legal blood alcohol concentration (BAC) limit for drivers 21 and over?',
    options: ['0.04%', '0.08%', '0.10%', '0.12%'],
    correctAnswer: 1,
    explanation: 'The legal BAC limit for drivers 21 and over is 0.08%. For commercial drivers it\'s 0.04%, and for drivers under 21 it\'s 0.01%.',
    difficulty: 'easy'
  },
  {
    id: 'tl007',
    category: 'Traffic Laws',
    question: 'When should you use your headlights?',
    options: ['Only at night', 'Only in rain', 'From sunset to sunrise and in bad weather', 'Only on highways'],
    correctAnswer: 2,
    explanation: 'Use headlights from sunset to sunrise, and during any weather conditions that require windshield wipers or reduce visibility.',
    difficulty: 'medium'
  },
  {
    id: 'tl008',
    category: 'Traffic Laws',
    question: 'What is the minimum following distance in good conditions?',
    options: ['1 second', '2 seconds', '3 seconds', '4 seconds'],
    correctAnswer: 1,
    explanation: 'Maintain at least a 2-second following distance in good conditions. Increase this distance in bad weather or heavy traffic.',
    difficulty: 'easy'
  },
  {
    id: 'tl009',
    category: 'Traffic Laws',
    question: 'When may you make a U-turn?',
    options: ['Never', 'Only at intersections', 'When safe and not prohibited by signs', 'Only on highways'],
    correctAnswer: 2,
    explanation: 'U-turns are allowed when safe and not prohibited by signs. Never make U-turns near hills, curves, or where visibility is limited.',
    difficulty: 'medium'
  },
  {
    id: 'tl010',
    category: 'Traffic Laws',
    question: 'What should you do when approaching a school bus with flashing red lights?',
    options: ['Pass carefully', 'Stop until lights stop flashing', 'Slow down', 'Change lanes'],
    correctAnswer: 1,
    explanation: 'You must stop when approaching a school bus with flashing red lights from either direction, until the lights stop flashing.',
    difficulty: 'easy'
  },
  {
    id: 'tl011',
    category: 'Traffic Laws',
    question: 'When is it legal to use a handheld cell phone while driving?',
    options: ['Never', 'Only at stop lights', 'Only in emergencies', 'Only when parked'],
    correctAnswer: 2,
    explanation: 'Handheld cell phone use is only permitted in emergencies. Otherwise, use hands-free devices or pull over to make calls.',
    difficulty: 'easy'
  },
  {
    id: 'tl012',
    category: 'Traffic Laws',
    question: 'What does a flashing yellow light mean?',
    options: ['Stop', 'Proceed with caution', 'Speed up', 'Turn around'],
    correctAnswer: 1,
    explanation: 'A flashing yellow light means proceed with caution. Slow down and be prepared to stop, but you may continue through the intersection.',
    difficulty: 'easy'
  },
  {
    id: 'tl013',
    category: 'Traffic Laws',
    question: 'When must you stop for a funeral procession?',
    options: ['Never', 'Only at intersections', 'When directed by police', 'Always until it passes'],
    correctAnswer: 3,
    explanation: 'You must yield the right-of-way to funeral processions and not interfere with them until they have passed.',
    difficulty: 'medium'
  },
  {
    id: 'tl014',
    category: 'Traffic Laws',
    question: 'What is the speed limit in school zones unless otherwise posted?',
    options: ['15 mph', '20 mph', '25 mph', '30 mph'],
    correctAnswer: 2,
    explanation: 'The default speed limit in school zones is 25 mph unless otherwise posted. Be extra alert for children.',
    difficulty: 'easy'
  },
  {
    id: 'tl015',
    category: 'Traffic Laws',
    question: 'When should you check your blind spots?',
    options: ['Only on highways', 'Only when turning', 'Before changing lanes or merging', 'Only in reverse'],
    correctAnswer: 2,
    explanation: 'Check blind spots before changing lanes, merging, or pulling away from curb. Don\'t rely solely on mirrors.',
    difficulty: 'medium'
  },
  {
    id: 'tl016',
    category: 'Traffic Laws',
    question: 'What is the legal requirement for child safety seats?',
    options: ['Until age 4', 'Until age 6 or 60 lbs', 'Until age 8 or 4\'9"', 'Until age 12'],
    correctAnswer: 2,
    explanation: 'Children must use appropriate car seats until age 8 or 4\'9" tall, whichever comes first. Follow manufacturer guidelines.',
    difficulty: 'medium'
  },
  {
    id: 'tl017',
    category: 'Traffic Laws',
    question: 'When may you cross a solid double yellow line?',
    options: ['Never', 'Only to pass', 'Only to turn left', 'Only in emergencies'],
    correctAnswer: 2,
    explanation: 'You may cross solid double yellow lines only to make left turns into driveways or businesses. Never cross to pass.',
    difficulty: 'medium'
  },
  {
    id: 'tl018',
    category: 'Traffic Laws',
    question: 'What should you do at a four-way stop?',
    options: ['First to arrive goes first', 'Yield to the right', 'Both A and B', 'Last to arrive goes first'],
    correctAnswer: 2,
    explanation: 'At four-way stops, the first vehicle to arrive goes first. If arriving simultaneously, yield to the vehicle on your right.',
    difficulty: 'medium'
  },
  {
    id: 'tl019',
    category: 'Traffic Laws',
    question: 'When is it legal to park in a handicapped space?',
    options: ['Never', 'Only with proper permit', 'Only on weekends', 'Only for 5 minutes'],
    correctAnswer: 1,
    explanation: 'You may only park in handicapped spaces with a valid permit or license plate, and only when the permit holder is present.',
    difficulty: 'easy'
  },
  {
    id: 'tl020',
    category: 'Traffic Laws',
    question: 'What should you do when your wheels drop off the pavement?',
    options: ['Turn immediately', 'Brake hard', 'Slow down and gradually return', 'Accelerate'],
    correctAnswer: 2,
    explanation: 'If wheels drop off pavement, slow down and gradually steer back onto the road. Don\'t turn abruptly or brake hard.',
    difficulty: 'medium'
  },
  // Safe Driving
  {
    id: 'sd001',
    category: 'Safe Driving',
    question: 'What is the most effective way to avoid hydroplaning?',
    options: ['Drive faster', 'Reduce speed and avoid puddles', 'Use cruise control', 'Turn off headlights'],
    correctAnswer: 1,
    explanation: 'To avoid hydroplaning, reduce speed, avoid puddles, and ensure proper tire inflation. Hydroplaning occurs at speeds over 35 mph.',
    difficulty: 'medium'
  },
  {
    id: 'sd002',
    category: 'Safe Driving',
    question: 'How far ahead should you look when driving?',
    options: ['2-3 seconds', '10-15 seconds', '30 seconds', '1 minute'],
    correctAnswer: 1,
    explanation: 'Look 10-15 seconds ahead to anticipate hazards and have time to react. This gives you space to make safe decisions.',
    difficulty: 'medium'
  },
  {
    id: 'sd003',
    category: 'Safe Driving',
    question: 'What should you do if your gas pedal sticks?',
    options: ['Turn off engine', 'Brake hard', 'Shift to neutral and brake', 'Accelerate'],
    correctAnswer: 2,
    explanation: 'If gas pedal sticks, shift to neutral, apply brakes firmly, and pull over safely. Don\'t turn off engine while moving.',
    difficulty: 'hard'
  },
  {
    id: 'sd004',
    category: 'Safe Driving',
    question: 'When driving in fog, you should:',
    options: ['Use high beams', 'Use low beams', 'Turn off lights', 'Use hazard lights'],
    correctAnswer: 1,
    explanation: 'Use low beams in fog. High beams reflect off fog and reduce visibility. Use fog lights if available.',
    difficulty: 'medium'
  },
  {
    id: 'sd005',
    category: 'Safe Driving',
    question: 'What is the best way to handle a tire blowout?',
    options: ['Brake immediately', 'Accelerate', 'Grip wheel firmly and ease off gas', 'Turn sharply'],
    correctAnswer: 2,
    explanation: 'During a tire blowout, grip the wheel firmly, ease off the gas, and gradually slow down. Don\'t brake suddenly.',
    difficulty: 'hard'
  },
  {
    id: 'sd006',
    category: 'Safe Driving',
    question: 'When should you use cruise control?',
    options: ['In heavy traffic', 'In city driving', 'On open highways in good weather', 'Never'],
    correctAnswer: 2,
    explanation: 'Use cruise control only on open highways in good weather. Avoid using in rain, heavy traffic, or hilly areas.',
    difficulty: 'medium'
  },
  {
    id: 'sd007',
    category: 'Safe Driving',
    question: 'What is the proper hand position on the steering wheel?',
    options: ['12 o\'clock', '10 and 2', '9 and 3', '8 and 4'],
    correctAnswer: 2,
    explanation: 'The recommended hand position is 9 and 3 o\'clock. This provides better control and reduces injury risk from airbags.',
    difficulty: 'easy'
  },
  {
    id: 'sd008',
    category: 'Safe Driving',
    question: 'When driving on ice, you should:',
    options: ['Drive normally', 'Reduce speed and increase following distance', 'Use cruise control', 'Follow closely'],
    correctAnswer: 1,
    explanation: 'On ice, reduce speed significantly and increase following distance. Gentle inputs are crucial - avoid sudden braking or steering.',
    difficulty: 'medium'
  },
  {
    id: 'sd009',
    category: 'Safe Driving',
    question: 'What should you do if you feel drowsy while driving?',
    options: ['Turn up radio', 'Open windows', 'Pull over and rest', 'Drink coffee'],
    correctAnswer: 2,
    explanation: 'The only safe solution to drowsiness is to pull over and rest. Other measures are temporary and unreliable.',
    difficulty: 'easy'
  },
  {
    id: 'sd010',
    category: 'Safe Driving',
    question: 'When approaching a curve, you should:',
    options: ['Brake in the curve', 'Accelerate through', 'Slow before entering', 'Maintain speed'],
    correctAnswer: 2,
    explanation: 'Slow down before entering a curve, then maintain steady speed through it. Braking in curves can cause loss of control.',
    difficulty: 'medium'
  },
  {
    id: 'sd011',
    category: 'Safe Driving',
    question: 'What is the best way to avoid distractions while driving?',
    options: ['Use hands-free devices', 'Focus only on driving', 'Adjust controls before moving', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Avoid all distractions by focusing solely on driving, adjusting controls before moving, and avoiding phone use entirely.',
    difficulty: 'easy'
  },
  {
    id: 'sd012',
    category: 'Safe Driving',
    question: 'When driving in heavy rain, you should:',
    options: ['Follow closely', 'Use high beams', 'Increase following distance', 'Drive faster'],
    correctAnswer: 2,
    explanation: 'In heavy rain, increase following distance to at least 4-5 seconds. Roads are slippery and visibility is reduced.',
    difficulty: 'medium'
  },
  {
    id: 'sd013',
    category: 'Safe Driving',
    question: 'What should you do if your brakes fail?',
    options: ['Turn off engine', 'Pump brakes, use emergency brake', 'Jump out', 'Accelerate'],
    correctAnswer: 1,
    explanation: 'If brakes fail, pump the pedal, downshift to lower gears, and gradually apply the emergency brake. Look for escape routes.',
    difficulty: 'hard'
  },
  {
    id: 'sd014',
    category: 'Safe Driving',
    question: 'When driving at night, you should:',
    options: ['Look at oncoming lights', 'Look to the right edge', 'Drive faster', 'Use high beams always'],
    correctAnswer: 1,
    explanation: 'At night, look to the right edge of the road to avoid glare from oncoming headlights. Use high beams when appropriate.',
    difficulty: 'medium'
  },
  {
    id: 'sd015',
    category: 'Safe Driving',
    question: 'What is the best way to handle skidding?',
    options: ['Brake hard', 'Turn into the skid', 'Accelerate', 'Turn away from skid'],
    correctAnswer: 1,
    explanation: 'If skidding, turn the steering wheel into the direction of the skid and ease off the gas. Don\'t brake suddenly.',
    difficulty: 'hard'
  },
  {
    id: 'sd016',
    category: 'Safe Driving',
    question: 'When following a motorcycle, you should:',
    options: ['Follow closely', 'Allow extra space', 'Use high beams', 'Honk frequently'],
    correctAnswer: 1,
    explanation: 'Allow extra space when following motorcycles. They can stop faster than cars and are less visible.',
    difficulty: 'medium'
  },
  {
    id: 'sd017',
    category: 'Safe Driving',
    question: 'What should you do when entering a highway?',
    options: ['Stop at the end', 'Yield to traffic and match speed', 'Force your way in', 'Drive slowly'],
    correctAnswer: 1,
    explanation: 'When entering highways, yield to traffic, match the speed of traffic, and merge smoothly when there\'s an adequate gap.',
    difficulty: 'medium'
  },
  {
    id: 'sd018',
    category: 'Safe Driving',
    question: 'When driving in strong winds, you should:',
    options: ['Drive faster', 'Grip wheel firmly and reduce speed', 'Turn off radio', 'Follow trucks closely'],
    correctAnswer: 1,
    explanation: 'In strong winds, grip the wheel firmly with both hands, reduce speed, and be extra careful when passing large vehicles.',
    difficulty: 'medium'
  },
  {
    id: 'sd019',
    category: 'Safe Driving',
    question: 'What is the best way to check tire pressure?',
    options: ['Visually inspect', 'Kick the tires', 'Use a pressure gauge when cold', 'Check after driving'],
    correctAnswer: 2,
    explanation: 'Check tire pressure with a gauge when tires are cold. Driving heats tires and increases pressure readings.',
    difficulty: 'easy'
  },
  {
    id: 'sd020',
    category: 'Safe Driving',
    question: 'When should you check your mirrors?',
    options: ['Only when turning', 'Every 5-8 seconds', 'Only on highways', 'Once per trip'],
    correctAnswer: 1,
    explanation: 'Check mirrors every 5-8 seconds to maintain awareness of your surroundings. This is crucial for defensive driving.',
    difficulty: 'easy'
  },
  // Parking Rules
  {
    id: 'pr001',
    category: 'Parking Rules',
    question: 'How far must you park from a fire hydrant?',
    options: ['5 feet', '10 feet', '15 feet', '20 feet'],
    correctAnswer: 2,
    explanation: 'You must park at least 15 feet away from a fire hydrant. This allows fire department access in emergencies.',
    difficulty: 'easy'
  },
  {
    id: 'pr002',
    category: 'Parking Rules',
    question: 'When parking uphill with a curb, you should:',
    options: ['Turn wheels to the right', 'Turn wheels to the left', 'Keep wheels straight', 'Turn wheels away from curb'],
    correctAnswer: 1,
    explanation: 'When parking uphill with a curb, turn wheels left toward the street. If the car rolls, the curb will stop it.',
    difficulty: 'medium'
  },
  {
    id: 'pr003',
    category: 'Parking Rules',
    question: 'How far from a crosswalk may you park?',
    options: ['10 feet', '20 feet', '30 feet', '40 feet'],
    correctAnswer: 1,
    explanation: 'You must park at least 20 feet from a crosswalk. This ensures visibility for pedestrians and drivers.',
    difficulty: 'easy'
  },
  {
    id: 'pr004',
    category: 'Parking Rules',
    question: 'When parking downhill, you should:',
    options: ['Turn wheels to curb', 'Turn wheels away from curb', 'Keep wheels straight', 'Set parking brake only'],
    correctAnswer: 0,
    explanation: 'When parking downhill, turn wheels toward the curb. This prevents the car from rolling into traffic if brakes fail.',
    difficulty: 'medium'
  },
  {
    id: 'pr005',
    category: 'Parking Rules',
    question: 'Where is parking never allowed?',
    options: ['On the right side', 'In driveways', 'On sidewalks', 'In parking lots'],
    correctAnswer: 2,
    explanation: 'Parking on sidewalks is never allowed as it obstructs pedestrian traffic and is dangerous.',
    difficulty: 'easy'
  },
  {
    id: 'pr006',
    category: 'Parking Rules',
    question: 'How far from a stop sign may you park?',
    options: ['10 feet', '20 feet', '30 feet', '50 feet'],
    correctAnswer: 2,
    explanation: 'You must park at least 30 feet from a stop sign to ensure visibility and proper intersection operation.',
    difficulty: 'medium'
  },
  {
    id: 'pr007',
    category: 'Parking Rules',
    question: 'When parallel parking, your wheels should be:',
    options: ['6 inches from curb', '12 inches from curb', '18 inches from curb', '24 inches from curb'],
    correctAnswer: 2,
    explanation: 'When parallel parking, your wheels should be within 18 inches of the curb. Closer is better but not required.',
    difficulty: 'medium'
  },
  {
    id: 'pr008',
    category: 'Parking Rules',
    question: 'You may not park within how many feet of a railroad crossing?',
    options: ['25 feet', '50 feet', '75 feet', '100 feet'],
    correctAnswer: 1,
    explanation: 'You must not park within 50 feet of a railroad crossing. This ensures visibility and safety.',
    difficulty: 'medium'
  },
  {
    id: 'pr009',
    category: 'Parking Rules',
    question: 'When parking on a hill without a curb, you should:',
    options: ['Turn wheels right', 'Turn wheels left', 'Keep wheels straight', 'Turn wheels downhill'],
    correctAnswer: 0,
    explanation: 'When parking on a hill without a curb, turn wheels to the right (off the road) so the car rolls away from traffic.',
    difficulty: 'hard'
  },
  {
    id: 'pr010',
    category: 'Parking Rules',
    question: 'What does a blue painted curb indicate?',
    options: ['No parking', 'Loading zone', 'Handicapped parking', 'Commercial parking'],
    correctAnswer: 2,
    explanation: 'Blue curbs indicate handicapped parking spaces. Only vehicles with proper permits may park here.',
    difficulty: 'easy'
  },
  {
    id: 'pr011',
    category: 'Parking Rules',
    question: 'What does a white painted curb indicate?',
    options: ['No parking', 'Loading zone', 'Passenger loading', 'Commercial zone'],
    correctAnswer: 2,
    explanation: 'White curbs indicate passenger loading zones. You may stop briefly to drop off or pick up passengers.',
    difficulty: 'medium'
  },
  {
    id: 'pr012',
    category: 'Parking Rules',
    question: 'What does a red painted curb indicate?',
    options: ['No parking', 'Loading zone', 'Handicapped parking', 'Time limit parking'],
    correctAnswer: 0,
    explanation: 'Red curbs indicate no parking, stopping, or standing. These are typically fire lanes or other restricted areas.',
    difficulty: 'easy'
  },
  {
    id: 'pr013',
    category: 'Parking Rules',
    question: 'What does a green painted curb indicate?',
    options: ['No parking', 'Time limit parking', 'Loading zone', 'Handicapped parking'],
    correctAnswer: 1,
    explanation: 'Green curbs indicate time-limited parking. Check signs for specific time limits, usually 15-30 minutes.',
    difficulty: 'medium'
  },
  {
    id: 'pr014',
    category: 'Parking Rules',
    question: 'What does a yellow painted curb indicate?',
    options: ['No parking', 'Commercial loading', 'Passenger loading', 'Handicapped parking'],
    correctAnswer: 1,
    explanation: 'Yellow curbs indicate commercial loading zones. Only commercial vehicles may stop here for loading/unloading.',
    difficulty: 'medium'
  },
  {
    id: 'pr015',
    category: 'Parking Rules',
    question: 'When parking facing uphill with no curb, turn wheels:',
    options: ['To the right', 'To the left', 'Straight', 'Toward the center'],
    correctAnswer: 0,
    explanation: 'When parking uphill without a curb, turn wheels to the right so the car rolls away from traffic if it moves.',
    difficulty: 'hard'
  },
  {
    id: 'pr016',
    category: 'Parking Rules',
    question: 'You may not park within how many feet of a fire station driveway?',
    options: ['10 feet', '15 feet', '20 feet', '25 feet'],
    correctAnswer: 2,
    explanation: 'You must not park within 20 feet of a fire station driveway when on the same side of the street.',
    difficulty: 'medium'
  },
  {
    id: 'pr017',
    category: 'Parking Rules',
    question: 'When parking at night on an unlit road, you should:',
    options: ['Leave lights on', 'Use parking lights', 'Turn off all lights', 'Use hazard lights'],
    correctAnswer: 1,
    explanation: 'When parking at night on an unlit road, use parking lights to make your vehicle visible to other drivers.',
    difficulty: 'medium'
  },
  {
    id: 'pr018',
    category: 'Parking Rules',
    question: 'Parallel parking should be completed in:',
    options: ['One movement', 'Two movements', 'Three movements', 'Four movements'],
    correctAnswer: 1,
    explanation: 'Parallel parking should ideally be completed in two movements: backing in, then pulling forward to center.',
    difficulty: 'medium'
  },
  {
    id: 'pr019',
    category: 'Parking Rules',
    question: 'When parking on a highway shoulder, you should:',
    options: ['Park parallel', 'Park at an angle', 'Turn wheels right', 'Turn wheels left'],
    correctAnswer: 0,
    explanation: 'When parking on a highway shoulder, park parallel to the road with all wheels off the traveled portion.',
    difficulty: 'easy'
  },
  {
    id: 'pr020',
    category: 'Parking Rules',
    question: 'You may not park within how many feet of a traffic signal?',
    options: ['10 feet', '20 feet', '30 feet', '40 feet'],
    correctAnswer: 2,
    explanation: 'You must not park within 30 feet of a traffic signal to ensure visibility and proper signal operation.',
    difficulty: 'medium'
  },
  // Alcohol & Drugs
  {
    id: 'ad001',
    category: 'Alcohol & Drugs',
    question: 'How many drinks does it take to affect your driving?',
    options: ['1 drink', '2 drinks', '3 drinks', 'Any amount affects driving'],
    correctAnswer: 3,
    explanation: 'Any amount of alcohol affects driving ability. Even one drink can impair judgment, coordination, and reaction time.',
    difficulty: 'easy'
  },
  {
    id: 'ad002',
    category: 'Alcohol & Drugs',
    question: 'What is the penalty for refusing a chemical test?',
    options: ['Warning', 'Fine', 'License suspension', 'Jail time'],
    correctAnswer: 2,
    explanation: 'Refusing a chemical test results in automatic license suspension, typically 6 months for first offense, plus other penalties.',
    difficulty: 'medium'
  },
  {
    id: 'ad003',
    category: 'Alcohol & Drugs',
    question: 'Which is most affected by alcohol?',
    options: ['Hearing', 'Vision', 'Judgment', 'Strength'],
    correctAnswer: 2,
    explanation: 'Alcohol most severely affects judgment, which is crucial for making safe driving decisions. This happens before other effects are noticeable.',
    difficulty: 'easy'
  },
  {
    id: 'ad004',
    category: 'Alcohol & Drugs',
    question: 'How long does it take for one drink to leave your system?',
    options: ['30 minutes', '1 hour', '2 hours', '4 hours'],
    correctAnswer: 1,
    explanation: 'It takes about 1 hour for your body to metabolize one standard drink. Coffee, showers, or food do not speed this up.',
    difficulty: 'medium'
  },
  {
    id: 'ad005',
    category: 'Alcohol & Drugs',
    question: 'What is implied consent?',
    options: ['Permission to drive', 'Agreement to chemical testing', 'Right to refuse tests', 'License requirement'],
    correctAnswer: 1,
    explanation: 'Implied consent means that by driving, you automatically agree to chemical testing if suspected of DUI. Refusal has penalties.',
    difficulty: 'medium'
  },
  {
    id: 'ad006',
    category: 'Alcohol & Drugs',
    question: 'Which drug category most impairs driving?',
    options: ['Depressants', 'Stimulants', 'Hallucinogens', 'All impair driving equally'],
    correctAnswer: 3,
    explanation: 'All drug categories impair driving ability. Prescription, over-the-counter, and illegal drugs can all affect driving safety.',
    difficulty: 'easy'
  },
  {
    id: 'ad007',
    category: 'Alcohol & Drugs',
    question: 'What is zero tolerance law?',
    options: ['No alcohol for minors', 'No drinking and driving', 'No open containers', 'No bars near schools'],
    correctAnswer: 0,
    explanation: 'Zero tolerance laws make it illegal for drivers under 21 to have any measurable alcohol in their system while driving.',
    difficulty: 'medium'
  },
  {
    id: 'ad008',
    category: 'Alcohol & Drugs',
    question: 'Which is a sign of alcohol impairment?',
    options: ['Improved coordination', 'Slower reaction time', 'Better vision', 'Increased alertness'],
    correctAnswer: 1,
    explanation: 'Slower reaction time is a key sign of alcohol impairment. Alcohol affects coordination, judgment, and vision negatively.',
    difficulty: 'easy'
  },
  {
    id: 'ad009',
    category: 'Alcohol & Drugs',
    question: 'What is the first thing affected by alcohol?',
    options: ['Vision', 'Coordination', 'Judgment', 'Balance'],
    correctAnswer: 2,
    explanation: 'Judgment is the first thing affected by alcohol, even before physical impairment becomes noticeable.',
    difficulty: 'medium'
  },
  {
    id: 'ad010',
    category: 'Alcohol & Drugs',
    question: 'Which medication can impair driving?',
    options: ['Only illegal drugs', 'Only alcohol', 'Only prescription drugs', 'Many medications'],
    correctAnswer: 3,
    explanation: 'Many medications, including prescription, over-the-counter, and herbal remedies can impair driving. Read warning labels.',
    difficulty: 'easy'
  },
  {
    id: 'ad011',
    category: 'Alcohol & Drugs',
    question: 'What is BAC?',
    options: ['Blood Alcohol Content', 'Breath Alcohol Count', 'Body Alcohol Concentration', 'Brain Alcohol Content'],
    correctAnswer: 0,
    explanation: 'BAC stands for Blood Alcohol Content, the percentage of alcohol in your bloodstream. It\'s used to measure impairment.',
    difficulty: 'easy'
  },
  {
    id: 'ad012',
    category: 'Alcohol & Drugs',
    question: 'How does caffeine affect alcohol impairment?',
    options: ['It sobers you up', 'It masks impairment', 'It eliminates alcohol', 'It has no effect'],
    correctAnswer: 1,
    explanation: 'Caffeine masks alcohol impairment by making you feel more alert, but it doesn\'t reduce BAC or improve driving ability.',
    difficulty: 'medium'
  },
  {
    id: 'ad013',
    category: 'Alcohol & Drugs',
    question: 'What is the penalty for first DUI offense?',
    options: ['Warning only', 'Fine and license suspension', 'Jail time only', 'License revocation'],
    correctAnswer: 1,
    explanation: 'First DUI typically includes fines ($500-2000), license suspension (6 months), probation, and possible DUI school.',
    difficulty: 'medium'
  },
  {
    id: 'ad014',
    category: 'Alcohol & Drugs',
    question: 'Which is true about marijuana and driving?',
    options: ['It improves driving', 'It has no effect', 'It impairs driving', 'Only illegal if drunk'],
    correctAnswer: 2,
    explanation: 'Marijuana impairs driving by affecting coordination, reaction time, and judgment. It\'s illegal to drive under its influence.',
    difficulty: 'easy'
  },
  {
    id: 'ad015',
    category: 'Alcohol & Drugs',
    question: 'What does an ignition interlock device do?',
    options: ['Tests vision', 'Prevents drunk driving', 'Improves engine', 'Tests speed'],
    correctAnswer: 1,
    explanation: 'An ignition interlock device requires a breath test before starting the vehicle to prevent drunk driving.',
    difficulty: 'medium'
  },
  {
    id: 'ad016',
    category: 'Alcohol & Drugs',
    question: 'How long does alcohol stay in your system?',
    options: ['2 hours', '4 hours', '8 hours', 'Up to 24 hours'],
    correctAnswer: 3,
    explanation: 'Alcohol can be detected in your system for up to 24 hours, depending on amount consumed and individual factors.',
    difficulty: 'medium'
  },
  {
    id: 'ad017',
    category: 'Alcohol & Drugs',
    question: 'What is open container law?',
    options: ['No alcohol in vehicles', 'No open alcohol containers', 'No drinking while driving', 'No alcohol in trunk'],
    correctAnswer: 1,
    explanation: 'Open container laws prohibit having open alcoholic beverage containers in the passenger area of a vehicle.',
    difficulty: 'easy'
  },
  {
    id: 'ad018',
    category: 'Alcohol & Drugs',
    question: 'Which factor affects alcohol absorption?',
    options: ['Only amount consumed', 'Food, weight, gender', 'Only time of day', 'Only type of drink'],
    correctAnswer: 1,
    explanation: 'Alcohol absorption is affected by food consumption, body weight, gender, metabolism, and other individual factors.',
    difficulty: 'medium'
  },
  {
    id: 'ad019',
    category: 'Alcohol & Drugs',
    question: 'What is administrative license suspension?',
    options: ['Voluntary surrender', 'Automatic suspension after arrest', 'Court-ordered suspension', 'Temporary suspension'],
    correctAnswer: 1,
    explanation: 'Administrative license suspension occurs automatically after DUI arrest, before court conviction, to immediately remove dangerous drivers.',
    difficulty: 'hard'
  },
  {
    id: 'ad020',
    category: 'Alcohol & Drugs',
    question: 'Which is the best strategy to avoid DUI?',
    options: ['Drive slowly', 'Eat while drinking', 'Designated driver', 'Wait 30 minutes'],
    correctAnswer: 2,
    explanation: 'Using a designated sober driver is the most effective strategy to avoid DUI and ensure everyone gets home safely.',
    difficulty: 'easy'
  },
  // Emergencies
  {
    id: 'em001',
    category: 'Emergencies',
    question: 'What should you do first in a vehicle fire?',
    options: ['Drive to fire station', 'Pull over and turn off engine', 'Use fire extinguisher', 'Call 911 while driving'],
    correctAnswer: 1,
    explanation: 'Immediately pull over safely, turn off the engine, and get everyone away from the vehicle. Then call for help.',
    difficulty: 'medium'
  },
  {
    id: 'em002',
    category: 'Emergencies',
    question: 'When should you use hazard lights?',
    options: ['Only when parked', 'When driving slowly', 'In emergencies or warnings', 'When turning'],
    correctAnswer: 2,
    explanation: 'Use hazard lights only for emergencies, breakdowns, or to warn other drivers of hazards ahead.',
    difficulty: 'easy'
  },
  {
    id: 'em003',
    category: 'Emergencies',
    question: 'What is the first step after an accident?',
    options: ['Leave scene', 'Take photos', 'Check for injuries', 'Call insurance'],
    correctAnswer: 2,
    explanation: 'First check for injuries and call for medical help if needed. Safety of people is the top priority.',
    difficulty: 'easy'
  },
  {
    id: 'em004',
    category: 'Emergencies',
    question: 'When approaching an emergency vehicle with flashing lights, you should:',
    options: ['Speed up', 'Move over and slow down', 'Maintain speed', 'Change lanes immediately'],
    correctAnswer: 1,
    explanation: 'Move over one lane if possible, or slow down significantly when passing emergency vehicles with flashing lights.',
    difficulty: 'medium'
  },
  {
    id: 'em005',
    category: 'Emergencies',
    question: 'What should you do if your accelerator sticks?',
    options: ['Turn off key', 'Brake hard', 'Shift to neutral and brake', 'Jump out'],
    correctAnswer: 2,
    explanation: 'Shift to neutral to disconnect engine power, then brake gradually and pull over safely. Don\'t turn off engine while moving.',
    difficulty: 'hard'
  },
  {
    id: 'em006',
    category: 'Emergencies',
    question: 'When driving through standing water, you should:',
    options: ['Drive quickly', 'Drive slowly and steadily', 'Stop in water', 'Turn around'],
    correctAnswer: 1,
    explanation: 'Drive slowly and steadily through standing water. If it\'s too deep or moving fast, turn around - don\'t drown.',
    difficulty: 'medium'
  },
  {
    id: 'em007',
    category: 'Emergencies',
    question: 'What should you keep in your emergency kit?',
    options: ['Only spare tire', 'First aid kit and tools', 'Only phone charger', 'Only insurance papers'],
    correctAnswer: 1,
    explanation: 'Keep a comprehensive emergency kit: first aid supplies, tools, flashlight, water, blankets, and emergency contact information.',
    difficulty: 'easy'
  },
  {
    id: 'em008',
    category: 'Emergencies',
    question: 'When your engine overheats, you should:',
    options: ['Continue driving', 'Turn off A/C and heater', 'Add cold water immediately', 'Speed up'],
    correctAnswer: 1,
    explanation: 'Turn off A/C, turn heater on high to help cool engine, and pull over safely. Don\'t open radiator cap while hot.',
    difficulty: 'medium'
  },
  {
    id: 'em009',
    category: 'Emergencies',
    question: 'What should you do if you encounter an aggressive driver?',
    options: ['Make eye contact', 'Speed up', 'Let them pass and avoid confrontation', 'Honk and gesture'],
    correctAnswer: 2,
    explanation: 'Avoid confrontation with aggressive drivers. Let them pass, don\'t make eye contact, and call 911 if they threaten safety.',
    difficulty: 'easy'
  },
  {
    id: 'em010',
    category: 'Emergencies',
    question: 'When must you report an accident to police?',
    options: ['Never', 'Only if someone is hurt', 'Always', 'Only over $1000 damage'],
    correctAnswer: 1,
    explanation: 'You must report accidents involving injury, death, or significant property damage. Check local requirements for specific thresholds.',
    difficulty: 'medium'
  },
  {
    id: 'em011',
    category: 'Emergencies',
    question: 'What is the move over law?',
    options: ['Move for fast cars', 'Move over for emergency vehicles', 'Move for construction', 'Move for trucks'],
    correctAnswer: 1,
    explanation: 'Move over laws require drivers to change lanes or slow down when approaching stopped emergency vehicles with flashing lights.',
    difficulty: 'medium'
  },
  {
    id: 'em012',
    category: 'Emergencies',
    question: 'When driving in a dust storm, you should:',
    options: ['Turn on high beams', 'Pull completely off road', 'Follow other cars', 'Speed up'],
    correctAnswer: 1,
    explanation: 'In dust storms, pull completely off the road, turn off lights, and wait. Other drivers may follow your lights if you stay on road.',
    difficulty: 'hard'
  },
  {
    id: 'em013',
    category: 'Emergencies',
    question: 'What should you do if you run off the road?',
    options: ['Brake hard', 'Turn sharply back', 'Ease off gas and gradually return', 'Accelerate'],
    correctAnswer: 2,
    explanation: 'Ease off the gas, maintain control, and gradually steer back onto the road. Don\'t brake hard or turn abruptly.',
    difficulty: 'medium'
  },
  {
    id: 'em014',
    category: 'Emergencies',
    question: 'When should you call 911 from your car?',
    options: ['Only for accidents', 'Only for breakdowns', 'Any emergency requiring immediate help', 'Never while driving'],
    correctAnswer: 2,
    explanation: 'Call 911 for any emergency requiring immediate assistance: accidents, crimes, medical emergencies, or fires.',
    difficulty: 'easy'
  },
  {
    id: 'em015',
    category: 'Emergencies',
    question: 'What is the first thing to do if your car breaks down on highway?',
    options: ['Fix it yourself', 'Call for help', 'Move to shoulder if possible', 'Leave vehicle'],
    correctAnswer: 2,
    explanation: 'First, try to move to the shoulder safely. Then turn on hazard lights and call for help from a safe location.',
    difficulty: 'medium'
  },
  {
    id: 'em016',
    category: 'Emergencies',
    question: 'When approaching a collision scene, you should:',
    options: ['Drive through quickly', 'Stop to help', 'Slow down and be alert', 'Take photos while driving'],
    correctAnswer: 2,
    explanation: 'Slow down and be alert at collision scenes. Don\'t stop unless you can safely help or are directly involved.',
    difficulty: 'easy'
  },
  {
    id: 'em017',
    category: 'Emergencies',
    question: 'What should you do if you encounter flooding on road?',
    options: ['Drive through quickly', 'Turn around', 'Wait for water to recede', 'Follow other cars'],
    correctAnswer: 1,
    explanation: 'Never drive through flooded roads. Turn around - it\'s impossible to tell water depth, and a foot of water can float cars.',
    difficulty: 'medium'
  },
  {
    id: 'em018',
    category: 'Emergencies',
    question: 'When your power steering fails, you should:',
    options: ['Stop immediately', 'Brake hard', 'Grip wheel firmly and slow down', 'Turn off engine'],
    correctAnswer: 2,
    explanation: 'Grip the wheel firmly with both hands, as steering will be much harder. Signal and pull over safely using extra force.',
    difficulty: 'hard'
  },
  {
    id: 'em019',
    category: 'Emergencies',
    question: 'What should you do if you see debris on highway?',
    options: ['Ignore it', 'Hit it', 'Report it and avoid if safe', 'Stop to remove it'],
    correctAnswer: 2,
    explanation: 'If safe, avoid debris and report it to authorities. Don\'t stop on highways to remove debris unless absolutely necessary.',
    difficulty: 'medium'
  },
  {
    id: 'em020',
    category: 'Emergencies',
    question: 'When should you use your horn?',
    options: ['Frequently', 'Only to warn others', 'When angry', 'At every intersection'],
    correctAnswer: 1,
    explanation: 'Use your horn only to warn others of danger or prevent collisions. Excessive horn use is illegal and annoying.',
    difficulty: 'easy'
  }
];

export const categories = [
  'Road Signs',
  'Traffic Laws', 
  'Safe Driving',
  'Parking Rules',
  'Alcohol & Drugs',
  'Emergencies'
] as const;

export type Category = typeof categories[number];
