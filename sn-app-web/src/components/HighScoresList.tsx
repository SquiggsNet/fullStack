// import React from 'react';
// import { createStyles, makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
// interface UserScore {
//   id: number;
//   name: string;
//   score: number;
// };

// interface Props {
//   scores: UserScore[];
// }

// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//     },
//     title: {
//       fontSize: 14,
//     },
//     table: {
//       minWidth: 260,
//       maxWidth: 650,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   }),
// );


// export const HighScoresList: React.FC<Props> = ({ scores }) => {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}> 
//       <CardContent>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//           High Scores
//         </Typography>
//         <TableContainer className={classes.table} component={Paper}>
//           <Table aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Position</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell align="right">Score</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {scores && scores.sort((a, b) => a.score >b.score ? -1 : 1).map((userScore, index) => (
//                 <TableRow key={userScore.id}>
//                   <TableCell>
//                     {index + 1}
//                   </TableCell>
//                   <TableCell component="th" scope="row">
//                     {userScore.name}
//                   </TableCell>
//                   <TableCell align="right">{userScore.score}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// };