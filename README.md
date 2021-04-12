## Login screen / Sign up screen

-Login screen allows user to switch between has an account and sign up.
I -I created an Input Component which i reuse to render the inputs.
-When username is taken an error will appear.
-When username or password has not required length an error message will appear.
-User can click on lock to see either password or password confirm.

- When user clicks on logout, i filter the sessionStorage and delete the user.
  Usually i would use a cookie, token, redux or check db.
  I did it this way, because it would be pointless to push the user to the '/' where he could simply
  type in the url his name.

## Wall

Content.tsx

- With the fetchLimit function i fetch an amount of images which can be
  specified by changing the imagesCount props in the App.tsx file.
  Actual i set it to 12
- In the first useEffect i check if the user already has items which were fetched, if yes i render them.
  Each time the user click on a post i check if 60 seconds are over, when yes i refetech the items or i set window.sessionStorage.setItem("data"), which is the actual state.
- As requested you will see the post id and username in the url, when you click on a post.
- When user returns back to wall the own username should be also visible on screen.
- Wall is reposnive. Wall will change images when viewport changes.
  - Desktop red picture
  - Tablet nature picture
  - Mobile animal picture
    Please see Picture.tsx

In helperFn.tsx you will find the function i use to fetch the items. Also i added a names array to show random names
on the posts.
The fetchLimit function is recursive, so i really fetch 1 post per 2 seconds.
More to this in Bonus section.

## Search

- As requested user should be able to search in body and title of a post.
- Search is possible on wall
- If search matches, user will be redirected to the post, will see it full size
- If search is not matching an error message will appear in the search field.
- Search field is only running when user typed in something. Searchfield is blocked until
  either an error or the redirected will happen.
- Search is available on all viewport sizes.
- I check dynamical the column size. As requested for desktop 3, tablet 2 and mobile 1.
  Therefore user is able to search on 3 items desktop , 2 tablet on 1 on mobile.
  Threshold is 1.
  When user click on search i use this helper function checkWidth() to determine the colum amount.

  In Content.tsx i use the IntersectionObserver Api to observe all the posts.
  I admit its a bit hacky. However this way i just render the fresh component, would i pass the props to the Card.tsx
  i would change the props and rerender the Array with the wall posts all the time. I wanted to avoid that.

## Error handling

    When user looses http connection an banner will appear with an message that connection is lost ->Connection.tsx
    Banner will be full screen, so that user is unable to do anything on page.
    When connection is back, i reload the page.
    When jsonplaceholder is down also an error should appear.
    404 Page will show when path is not matching,user can return to home page.
    Of course i could prevent this and directly route them to homepage.

## Bonus

    Its the first time i wrote an app with typescript this essentially took me the most time.
    Also im sorry for the test, also here there is potential to improve.
    I know i could outsource more code into functions in Content.tsx.
    In addition i would change the fetch behavior, i could fetch the items and then with css diplay them
    per keyframe to the dom.
    I wanted to try if it works the way i did it. In a real app i would use pagination.
    Then i would fetch 10, then skip 10 and fetch the next 10.

    By purpose i havent use redux in the app, its easy then to communicate with the components but i think for
    this app it would be a overkill.


    Errors, when user logs out and all posts are not rendered, recursive function will continue to run.
    Here i should add an exit.

    Custom Webpack to optimze bundle size
    Custom Webpack to expand scss functionality to 
    create global scss variables and use them and partials.


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`